'use client';

import React from 'react';
import Image from 'next/image';
import { formatPrice } from '@/shared/lib/utils';
import { useOrderContext } from '../context/OrderContext';

const OrderListSection = () => {
  const {
    selectedPostcards,
    deselectPostcard,
    clearAllSelected,
    updateQuantity,
  } = useOrderContext();

  const handleRemovePostcard = (postcardId: number) => {
    deselectPostcard(postcardId);
  };

  const handleClearAll = () => {
    clearAllSelected();
  };

  const handleQuantityChange = (postcardId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(postcardId, newQuantity);
  };

  return (
    <section className="lg:col-span-2 order-2 lg:order-1">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <header className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              선택된 엽서 ({selectedPostcards.length}개)
            </h2>
            {selectedPostcards.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                전체 삭제
              </button>
            )}
          </div>
        </header>

        <div className="divide-y divide-gray-200">
          {selectedPostcards.map(postcard => (
            <div
              key={postcard.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                {/* 엽서 이미지와 기본 정보 */}
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative w-20 h-28 flex-shrink-0">
                    <Image
                      src={postcard.image}
                      alt={postcard.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {postcard.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      #{postcard.theme}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {postcard.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 space-y-2 sm:space-y-0">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                        <span className="text-lg font-bold text-blue-600">
                          {formatPrice(postcard.price)}
                        </span>
                        <span className="text-sm text-gray-500">
                          × {postcard.quantity}개
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          {formatPrice(postcard.price * postcard.quantity)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {postcard.selectedAt.toLocaleDateString('ko-KR')} 선택
                      </span>
                    </div>
                  </div>
                </div>

                {/* 수량 조절 및 삭제 버튼 */}
                <div className="flex items-center justify-between sm:justify-end space-x-3">
                  {/* 수량 조절 */}
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() =>
                        handleQuantityChange(postcard.id, postcard.quantity - 1)
                      }
                      disabled={postcard.quantity <= 1}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 text-sm font-medium min-w-[3rem] text-center">
                      {postcard.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(postcard.id, postcard.quantity + 1)
                      }
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                      +
                    </button>
                  </div>

                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => handleRemovePostcard(postcard.id)}
                    className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                    aria-label={`${postcard.title} 제거`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrderListSection;
