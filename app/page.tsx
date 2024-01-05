import Image from 'next/image';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { MaxWidthWrapper } from '@/components/max-width-wrapper';

export default function Home() {
  return (
    <div className="bg-grid-slate-200/50">
      <MaxWidthWrapper className="mb-12 pt-28 sm:pt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">Doc Quest is now public!</p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Chat with your <span className="text-blue-600">documents</span> in{' '}
          <span className="whitespace-nowrap">
            <span className="inline relative text-primary">
              <span className="text-blue-600">seconds.</span>
              <span className="absolute inset-x-0  bottom-1 translate-y-full hidden sm:flex">
                <Icons.blueSpace style={{ fill: '#2263EB' }} />
              </span>
            </span>
          </span>
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg md:pt-4">
          Doc Quest allows you to have conversations with any PDF document. Simply upload your file
          and start asking questions right away.
        </p>
        <Link
          className={buttonVariants({
            className: 'mt-5',
          })}
          href="/dashboard"
          target="_blank"
        >
          Get Started <Icons.arrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <Image
              src="/dashboard-preview.jpg"
              width={1364}
              height={866}
              alt="product preview"
              quality={100}
              className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto mb-20 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-950 sm:text-5xl">
              Start chatting in minutes
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Chatting to your PDF files has never been easier than with Doc Quest.
            </p>
          </div>
        </div>
        <ul className="my-8 space-y-4 mt-8 mx-4 md:mx-0 md:flex md:space-x-12 md:space-y-0 border border-slate-300 md:p-6 bg-white rounded-xl shadow-lg">
          <li className="md:flex-1 pt-2 sm:pt-0">
            <div className="flex flex-col space-y-2 py-2 pl-4 md:pb-0 md:pl-0 md:mb-2 px-2 sm:px-0">
              <span className="text-sm font-medium text-blue-600">Step 1</span>
              <span className="text-xl font-semibold">Sign up for an account</span>
              <span className="mt-2 text-zinc-700">
                Either starting out with a free plan or choose our{' '}
                <Link href="/pricing" className="text-blue-700 underline underline-offset-2">
                  pro plan
                </Link>
                .
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 py-2 pl-4 md:pb-0 md:pl-0 px-2 sm:px-0">
              <span className="text-sm font-medium text-blue-600">Step 2</span>
              <span className="text-xl font-semibold">Upload your PDF file</span>
              <span className="mt-2 text-zinc-700">
                We&apos;ll process your file and make it ready for you to chat with.
              </span>
            </div>
          </li>
          <li className="md:flex-1 pb-2 sm:pb-0">
            <div className="flex flex-col space-y-2 py-2 pl-4 md:pb-0 md:pl-0 px-2 sm:px-0">
              <span className="text-sm font-medium text-blue-600">Step 3</span>
              <span className="text-xl font-semibold">Start asking questions</span>
              <span className="mt-2 text-zinc-700">
                It&apos;s that simple. Try out Doc Quest today - it really takes less than a minute.
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <Image
              src="/file-upload-preview.jpg"
              width={1419}
              height={732}
              alt="uploading preview"
              quality={100}
              loading="lazy"
              className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
            />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-transparent to-white pb-40 pt-24 text-center font-semibold text-slate-800">
        thanks for checking out Doc Quest
      </div>
    </div>
  );
}
