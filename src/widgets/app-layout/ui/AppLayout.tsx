'use client';

import { ReactNode } from 'react';
import { Header } from '@/widgets/header/ui';
import { Footer } from '@/widgets/footer/ui';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
