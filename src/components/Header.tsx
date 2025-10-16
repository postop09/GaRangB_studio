'use client';

import { PageType } from '@/types';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          <span className="text-gray-600">My Photo Studio</span>
        </h1>
        <nav className="flex space-x-4">
          <button
            onClick={() => onNavigate('main')}
            className={`text-lg font-medium transition duration-150 ease-in-out px-3 py-1 rounded-lg ${
              currentPage === 'main'
                ? 'text-gray-900 bg-gray-100'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            메인 갤러리
          </button>
          <button
            onClick={() => onNavigate('wall')}
            className={`text-lg font-medium transition duration-150 ease-in-out px-3 py-1 rounded-lg ${
              currentPage === 'wall'
                ? 'text-pink-800 bg-pink-100'
                : 'text-pink-600 hover:text-pink-800 hover:bg-pink-100'
            }`}
          >
            벽 꾸미기
          </button>
        </nav>
      </div>
    </header>
  );
}

