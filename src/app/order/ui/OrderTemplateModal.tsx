'use client';

import { useState } from 'react';
import { SelectedPostcard } from '@/shared';
import { formatPrice } from '@/shared/lib/utils';

interface OrderTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPostcards: SelectedPostcard[];
  totalPrice: number;
  totalQuantity: number;
}

export function OrderTemplateModal({
  isOpen,
  onClose,
  selectedPostcards,
  totalPrice,
  totalQuantity,
}: OrderTemplateModalProps) {
  const [copied, setCopied] = useState(false);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-end justify-center">
      <div className="bg-white rounded-t-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col transform transition-transform duration-300 ease-out">
        {/* 헤더 */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              📮 주문 문의 템플릿
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <svg
                className="w-6 h-6"
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
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            아래 템플릿을 복사하여 인스타그램 DM으로 주문 문의를 보내주세요
          </p>
        </div>

        {/* 템플릿 내용 */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border">
            <pre className="whitespace-pre-wrap text-xs sm:text-sm text-gray-800 font-mono leading-relaxed">
              {generateOrderTemplate()}
            </pre>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
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

          <div className="mt-4 text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              복사 후 인스타그램 DM에서{' '}
              <span className="font-semibold">@garangb_official</span>에게
              전송해주세요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
