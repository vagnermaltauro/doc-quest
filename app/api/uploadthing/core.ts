import db from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

import { PLANS } from '@/config/stripe';
import { getPineconeClient } from '@/lib/pinecone';

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: '4MB' } })
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession();
      const user = getUser();

      if (!user || !user.id) throw new Error('Unauthorized');

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }: any) => {
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          uploadStatus: 'PROCESSING',
        },
      });

      try {
        const response = await fetch(
          `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
        );
        const blob = await response.blob();
        const loader = new PDFLoader(blob);
        const pageLevelDocs = await loader.load();
        const pagesAmt = pageLevelDocs.length;

        const { subscriptionPlan } = metadata;
        const { isSubscribed } = subscriptionPlan;

        const isProExceeded = pagesAmt > PLANS.find((plan) => plan.name === 'Pro')!.pagesPerPdf;
        const isFreeExceeded = pagesAmt > PLANS.find((plan) => plan.name === 'Free')!.pagesPerPdf;

        if ((isSubscribed && isProExceeded) || (!isSubscribed && isFreeExceeded)) {
          await db.file.update({
            data: {
              uploadStatus: 'FAILED',
            },
            where: {
              id: createdFile.id,
            },
          });
        }

        const pinecone = await getPineconeClient();
        const pineconeIndex = pinecone.Index('doc-quest');
        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        });

        await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
          //@ts-ignore
          pineconeIndex,
          namespace: createdFile.id,
        });

        await db.file.update({
          data: {
            uploadStatus: 'SUCCESS',
          },
          where: {
            id: createdFile.id,
          },
        });
      } catch (error) {
        await db.file.update({
          data: {
            uploadStatus: 'FAILED',
          },
          where: {
            id: createdFile.id,
          },
        });
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
