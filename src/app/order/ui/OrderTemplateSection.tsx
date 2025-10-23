'use client';

import React from 'react';
import { useOrderContext } from '../context/OrderContext';

const OrderTemplateSection = () => {
  const { copied, handleCopy, handleInstagramClick, generateOrderTemplate } =
    useOrderContext();

  return (
    <section className="mt-6 rounded-xl">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        📮 주문 문의 템플릿
      </h3>

      {/* 템플릿 내용 */}
      <div className="bg-white rounded-lg p-4 border mb-4">
        <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed overflow-x-auto">
          {generateOrderTemplate()}
        </pre>
      </div>

      {/* 액션 버튼들 */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleCopy}
          className={`w-full px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {copied ? '✅ 복사 완료!' : '📋 템플릿 복사'}
        </button>
        <button
          onClick={handleInstagramClick}
          className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
        >
          📱 인스타그램으로 이동
        </button>
      </div>

      <p className="text-xs text-gray-600 text-center mt-4">
        복사 후 인스타그램 DM에서{' '}
        <span className="font-semibold">@9a.rang.b</span>에게 전송해주세요
      </p>
    </section>
  );
};

export default OrderTemplateSection;
