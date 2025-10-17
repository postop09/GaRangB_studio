'use client';

import { ReactNode } from 'react';
import { Header } from '@/widgets/header/ui';
import { Footer } from '@/widgets/footer/ui';
import { useNavigation } from '@/shared/lib/navigation';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { currentPage, navigate } = useNavigation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={navigate} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
