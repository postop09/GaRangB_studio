'use client';

import { formatPrice } from '@/shared';
import React from 'react';
import { useOrderContext } from '../context/OrderContext';
import OrderTemplateSection from './OrderTemplateSection';

const OrderSummarySection = () => {
  const {
    selectedPostcards,
    totalPrice,
    totalQuantity,
    showTemplate,
    toggleTemplate,
  } = useOrderContext();

  return (
    <section className="lg:col-span-1 order-2">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 lg:mb-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">주문 요약</h3>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">엽서 종류</span>
            <span className="font-medium">{selectedPostcards.length}종류</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">총 수량</span>
            <span className="font-medium">{totalQuantity}개</span>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>총 금액</span>
              <span className="text-blue-600">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
        <button
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg"
          onClick={toggleTemplate}
        >
          {showTemplate ? '템플릿 숨기기' : '주문 문의하기'}
        </button>
        <p className="text-xs text-gray-500 text-center mt-4">
          위 버튼을 눌러 인스타 DM으로 문의해주세요.
        </p>
        {/* 주문 문의 템플릿 */}
        {showTemplate && <OrderTemplateSection />}
      </div>
    </section>
  );
};

export default OrderSummarySection;
