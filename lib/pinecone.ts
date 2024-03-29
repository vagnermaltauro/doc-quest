import { Pinecone } from '@pinecone-database/pinecone';

export const getPineconeClient = async () => {
  const client = new Pinecone({
    environment: 'gcp-starter',
    apiKey: process.env.PINECONE_API_KEY!,
  });
  return client;
};
