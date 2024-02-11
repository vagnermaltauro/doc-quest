import { cn, constructMetadata } from '@/lib/utils';
import { NavBar } from '@/components/nav-bar';

import '@/styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'simplebar-react/dist/simplebar.min.css';

import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = constructMetadata()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <Providers>
        <body className={cn(inter.className, 'bg-white')}>
          <Toaster />
          <NavBar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
