'use client';

import { useState } from 'react';
import { useSelectedPostcards } from '@/shared';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { formatPrice } from '@/shared/lib/utils';

function OrderSection() {
  const router = useRouter();
  const [showTemplate, setShowTemplate] = useState(false);
  const [copied, setCopied] = useState(false);
  const {
    selectedPostcards,
    deselectPostcard,
    clearAllSelected,
    updateQuantity,
    totalPrice,
    totalQuantity,
    isLoading,
  } = useSelectedPostcards();

  const handleBackToHome = () => {
    router.push('/');
  };

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

  const generateOrderTemplate = () => {
    const orderDate = new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    let template = `📮 Ga.Rang.B 엽서 주문 문의\n\n`;
    template += `📅 주문일: ${orderDate}\n\n`;
    template += `🛍️ 주문 상품:\n`;

    selectedPostcards.forEach((postcard, index) => {
      template += `${index + 1}. ${postcard.title}\n`;
      template += `   - 테마: #${postcard.theme}\n`;
      template += `   - 수량: ${postcard.quantity}장\n`;
      template += `   - 단가: ${formatPrice(postcard.price)}\n`;
      template += `   - 소계: ${formatPrice(
        postcard.price * postcard.quantity
      )}\n\n`;
    });

    template += `💰 주문 요약:\n`;
    template += `- 총 수량: ${totalQuantity}장\n`;
    template += `- 총 금액: ${formatPrice(totalPrice)}\n\n`;
    template += `📝 배송 정보:\n`;
    template += `- 받는 분: [이름]\n`;
    template += `- 연락처: [전화번호]\n`;
    template += `- 주소: [배송주소]\n\n`;
    template += `💬 추가 요청사항:\n`;
    template += `[특별 요청사항이 있으시면 적어주세요]\n\n`;
    template += `감사합니다! 🙏`;

    return template;
  };

  const handleOrderClick = () => {
    setShowTemplate(!showTemplate);
  };

  const handleCopy = async () => {
    try {
      const template = generateOrderTemplate();
      await navigator.clipboard.writeText(template);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('복사 실패:', error);
      // 폴백: 텍스트 선택
      const textArea = document.createElement('textarea');
      textArea.value = generateOrderTemplate();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/garangb_official/', '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (selectedPostcards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">주문하기</h1>
              <p className="text-gray-600 mt-2">
                선택한 엽서를 확인하고 주문을 진행하세요
              </p>
            </div>
            <button
              onClick={handleBackToHome}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← 홈으로 돌아가기
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* 선택된 엽서 목록 */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    선택된 엽서 ({selectedPostcards.length}개)
                  </h2>
                  {selectedPostcards.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      전체 삭제
                    </button>
                  )}
                </div>
              </div>

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
                                {formatPrice(
                                  postcard.price * postcard.quantity
                                )}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {postcard.selectedAt.toLocaleDateString('ko-KR')}{' '}
                              선택
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
                              handleQuantityChange(
                                postcard.id,
                                postcard.quantity - 1
                              )
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
                              handleQuantityChange(
                                postcard.id,
                                postcard.quantity + 1
                              )
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
          </div>

          {/* 주문 요약 */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24 lg:top-8 mb-6 lg:mb-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                주문 요약
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">엽서 종류</span>
                  <span className="font-medium">
                    {selectedPostcards.length}종류
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">총 수량</span>
                  <span className="font-medium">{totalQuantity}개</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>총 금액</span>
                    <span className="text-blue-600">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                onClick={handleOrderClick}
              >
                {showTemplate ? '템플릿 숨기기' : '주문 문의하기'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                위 버튼을 눌러 인스타 DM으로 문의해주세요.
              </p>

              {/* 주문 문의 템플릿 */}
              {showTemplate && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    📮 주문 문의 템플릿
                  </h3>

                  <div className="bg-white rounded-lg p-4 border mb-4">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed overflow-x-auto">
                      {generateOrderTemplate()}
                    </pre>
                  </div>

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
                    <span className="font-semibold">@garangb_official</span>에게
                    전송해주세요
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSection;
