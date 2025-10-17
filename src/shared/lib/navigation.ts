'use client';

import { useRouter, usePathname } from 'next/navigation';
import { PageType } from '@/shared/types';

export function useNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentPage = (): PageType => {
    if (pathname === '/wall') return 'wall';
    return 'main';
  };

  const navigate = (page: PageType) => {
    if (page === 'wall') {
      router.push('/wall');
    } else {
      router.push('/home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    currentPage: getCurrentPage(),
    navigate,
  };
}
