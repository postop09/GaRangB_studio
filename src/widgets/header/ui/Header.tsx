'use client';

import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentPage = () => {
    if (pathname === '/wall') return 'wall';
    if (pathname === '/order') return 'order';
    return 'main';
  };

  const currentPage = getCurrentPage();

  const handleHomeClick = () => {
    router.push('/');
    window.scrollTo({ top: 0 });
  };

  const handleWallClick = () => {
    router.push('/wall');
    window.scrollTo({ top: 0 });
  };

  const handleOrderClick = () => {
    router.push('/order');
    window.scrollTo({ top: 0 });
  };

  return (
    <header className="bg-[#faf8f5] border-b border-[#e8ddd4] fixed top-0 z-100 backdrop-blur-sm bg-opacity-95 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        {/* 브랜드 로고 영역 */}
        <div className="flex items-center space-x-4">
          {/* 브랜드 로고 */}
          <div className="rounded-full border-2 border-[#2c2c2c] flex items-center justify-center bg-white overflow-hidden">
            <Image
              src="/img/img_logo.png"
              alt="Ga.Rang.B Logo"
              width={40}
              height={40}
              priority
            />
          </div>

          {/* 브랜드명 */}
          <div>
            <h1 className="font-brand text-2xl font-semibold text-[#2c2c2c] tracking-tight">
              Ga.Rang.B
            </h1>
            <p className="font-brand-subtitle text-xs text-[#6b6b6b]">
              Stories in Pictures
            </p>
          </div>
        </div>

        {/* 네비게이션 */}
        <nav className="flex items-center space-x-2">
          <button
            onClick={handleHomeClick}
            className={`font-medium transition-all duration-300 ease-in-out px-6 py-3 rounded-full text-sm ${
              currentPage === 'main'
                ? 'text-[#2c2c2c] bg-[#e8ddd4] shadow-sm'
                : 'text-[#6b6b6b] hover:text-[#2c2c2c] hover:bg-[#f5f1eb]'
            }`}
          >
            홈
          </button>
          <button
            onClick={handleWallClick}
            className={`font-medium transition-all duration-300 ease-in-out px-6 py-3 rounded-full text-sm ${
              currentPage === 'wall'
                ? 'text-[#2c2c2c] bg-[#e8ddd4] shadow-sm'
                : 'text-[#6b6b6b] hover:text-[#2c2c2c] hover:bg-[#f5f1eb]'
            }`}
          >
            벽 꾸미기
          </button>
          <button
            onClick={handleOrderClick}
            className={`relative font-medium transition-all duration-300 ease-in-out px-6 py-3 rounded-full text-sm ${
              currentPage === 'order'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
            }`}
          >
            주문 문의
          </button>
        </nav>
      </div>
    </header>
  );
}
