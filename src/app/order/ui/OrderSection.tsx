'use client';

import { LoadingSpinner } from '@/shared';
import { OrderProvider, useOrderContext } from '../context/OrderContext';
import EmptySection from './EmptySection';
import OrderListSection from './OrderListSection';
import OrderSummarySection from './OrderSummarySection';

function OrderSectionContent() {
  const { selectedPostcards, isLoading } = useOrderContext();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (selectedPostcards.length === 0) {
    return <EmptySection />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* 페이지 헤더 */}
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">주문 문의하기</h2>
          <p className="text-gray-600 mt-2">
            선택한 엽서를 확인하고 주문을 진행하세요
          </p>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <OrderListSection />
          <OrderSummarySection />
        </main>
      </div>
    </div>
  );
}

function OrderSection() {
  return (
    <OrderProvider>
      <OrderSectionContent />
    </OrderProvider>
  );
}

export default OrderSection;
