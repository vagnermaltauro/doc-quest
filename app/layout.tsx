import { cn } from '@/lib/utils';
import { NavBar } from '@/components/nav-bar';

import '@/styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Doc Quest',
  description: 'Chat with your documents in seconds',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <Providers>
        <body className={cn(inter.className, 'bg-white')}>
          <NavBar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
