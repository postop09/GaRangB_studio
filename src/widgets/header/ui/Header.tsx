'use client';

import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getCurrentPage = () => {
    if (pathname === '/wall') return 'wall';
    if (pathname === '/order') return 'order';
    return 'main';
  };

  const currentPage = getCurrentPage();

  const handleHomeClick = () => {
    router.push('/');
    window.scrollTo({ top: 0 });
    setIsMobileMenuOpen(false);
  };

  const handleWallClick = () => {
    router.push('/wall');
    window.scrollTo({ top: 0 });
    setIsMobileMenuOpen(false);
  };

  const handleOrderClick = () => {
    router.push('/order');
    window.scrollTo({ top: 0 });
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="bg-[#faf8f5] border-b border-[#e8ddd4] fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 lg:py-6">
          {/* 모바일: 세로 레이아웃, 데스크톱: 가로 레이아웃 */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
            {/* 브랜드 로고 영역 */}
            <div className="flex items-center justify-between sm:justify-start">
              <div className="flex items-center space-x-3 sm:space-x-4">
                {/* 브랜드 로고 */}
                <div className="rounded-full border-2 border-[#2c2c2c] flex items-center justify-center bg-white overflow-hidden flex-shrink-0">
                  <Image
                    src="/img/img_logo.png"
                    alt="Ga.Rang.B Logo"
                    width={32}
                    height={32}
                    className="sm:w-10 sm:h-10"
                    priority
                  />
                </div>

                {/* 브랜드명 */}
                <div className="min-w-0 flex-1">
                  <h1 className="font-brand text-lg sm:text-xl lg:text-2xl font-semibold text-[#2c2c2c] tracking-tight truncate">
                    Ga.Rang.B
                  </h1>
                  <p className="font-brand-subtitle text-xs text-[#6b6b6b] truncate">
                    Stories in Pictures
                  </p>
                </div>
              </div>

              {/* 모바일 햄버거 메뉴 버튼 */}
              <button
                onClick={toggleMobileMenu}
                className="sm:hidden hamburger-button rounded-lg hover:bg-[#f5f1eb] transition-colors duration-200"
                aria-label="메뉴 열기"
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <span
                    className={`block h-0.5 bg-[#2c2c2c] transition-all duration-300 ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 bg-[#2c2c2c] transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : ''
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 bg-[#2c2c2c] transition-all duration-300 ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                    }`}
                  ></span>
                </div>
              </button>
            </div>

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden sm:flex items-center space-x-2">
              <button
                onClick={handleHomeClick}
                className={`font-medium transition-all duration-300 ease-in-out px-4 py-2 lg:px-6 lg:py-3 rounded-full text-sm ${
                  currentPage === 'main'
                    ? 'text-[#2c2c2c] bg-[#e8ddd4] shadow-sm'
                    : 'text-[#6b6b6b] hover:text-[#2c2c2c] hover:bg-[#f5f1eb]'
                }`}
              >
                홈
              </button>
              <button
                onClick={handleWallClick}
                className={`font-medium transition-all duration-300 ease-in-out px-4 py-2 lg:px-6 lg:py-3 rounded-full text-sm ${
                  currentPage === 'wall'
                    ? 'text-[#2c2c2c] bg-[#e8ddd4] shadow-sm'
                    : 'text-[#6b6b6b] hover:text-[#2c2c2c] hover:bg-[#f5f1eb]'
                }`}
              >
                벽 꾸미기
              </button>
              <button
                onClick={handleOrderClick}
                className={`relative font-medium transition-all duration-300 ease-in-out px-4 py-2 lg:px-6 lg:py-3 rounded-full text-sm ${
                  currentPage === 'order'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
                }`}
              >
                주문 문의
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 오버레이 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 sm:hidden">
          {/* 배경 오버레이 */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleMobileMenu}
          ></div>

          {/* 모바일 메뉴 */}
          <div className="absolute top-0 right-0 w-64 h-full bg-[#faf8f5] border-l border-[#e8ddd4] shadow-xl">
            <div className="p-6">
              {/* 메뉴 헤더 */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-brand text-xl font-semibold text-[#2c2c2c]">
                  메뉴
                </h2>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg hover:bg-[#f5f1eb] transition-colors duration-200"
                  aria-label="메뉴 닫기"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <span className="block w-6 h-0.5 bg-[#2c2c2c] rotate-45"></span>
                    <span className="block w-6 h-0.5 bg-[#2c2c2c] -rotate-45 -translate-y-0.5"></span>
                  </div>
                </button>
              </div>

              {/* 모바일 네비게이션 */}
              <nav className="space-y-4">
                <button
                  onClick={handleHomeClick}
                  className={`w-full text-left mobile-nav-button font-medium transition-all duration-300 ease-in-out rounded-lg ${
                    currentPage === 'main'
                      ? 'text-[#2c2c2c] bg-[#e8ddd4] shadow-sm'
                      : 'text-[#6b6b6b] hover:text-[#2c2c2c] hover:bg-[#f5f1eb]'
                  }`}
                >
                  홈
                </button>
                <button
                  onClick={handleWallClick}
                  className={`w-full text-left mobile-nav-button font-medium transition-all duration-300 ease-in-out rounded-lg ${
                    currentPage === 'wall'
                      ? 'text-[#2c2c2c] bg-[#e8ddd4] shadow-sm'
                      : 'text-[#6b6b6b] hover:text-[#2c2c2c] hover:bg-[#f5f1eb]'
                  }`}
                >
                  벽 꾸미기
                </button>
                <button
                  onClick={handleOrderClick}
                  className={`w-full text-left mobile-nav-button font-medium transition-all duration-300 ease-in-out rounded-lg ${
                    currentPage === 'order'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
                  }`}
                >
                  주문 문의
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
