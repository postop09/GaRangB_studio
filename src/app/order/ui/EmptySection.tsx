'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

function EmptySection() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          선택된 엽서가 없습니다
        </h2>
        <p className="text-gray-600 mb-8">
          홈페이지에서 원하는 엽서를 선택해주세요.
        </p>
        <button
          onClick={handleBackToHome}
          className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200"
        >
          홈으로 돌아가기
        </button>
      </div>
    </section>
  );
}

export default EmptySection;
