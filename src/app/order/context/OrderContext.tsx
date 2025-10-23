'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useSelectedPostcards, type SelectedPostcard } from '@/shared';
import { formatPrice } from '@/shared/lib/utils';

interface OrderContextType {
  // 템플릿 관련 상태
  showTemplate: boolean;
  setShowTemplate: (show: boolean) => void;
  toggleTemplate: () => void;

  // 복사 관련 상태
  copied: boolean;
  setCopied: (copied: boolean) => void;

  // 주문 데이터
  selectedPostcards: SelectedPostcard[];
  totalPrice: number;
  totalQuantity: number;
  isLoading: boolean;

  // 액션 함수들
  handleCopy: () => Promise<void>;
  handleInstagramClick: () => void;
  generateOrderTemplate: () => string;
  updateQuantity: (postcardId: number, quantity: number) => void;
  deselectPostcard: (postcardId: number) => void;
  clearAllSelected: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export function OrderProvider({ children }: OrderProviderProps) {
  const [showTemplate, setShowTemplate] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    selectedPostcards,
    totalPrice,
    totalQuantity,
    isLoading,
    updateQuantity,
    deselectPostcard,
    clearAllSelected,
  } = useSelectedPostcards();

  const toggleTemplate = () => {
    setShowTemplate(!showTemplate);
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
    window.open('https://www.instagram.com/9a.rang.b/', '_blank');
  };

  const value: OrderContextType = {
    showTemplate,
    setShowTemplate,
    toggleTemplate,
    copied,
    setCopied,
    selectedPostcards,
    totalPrice,
    totalQuantity,
    isLoading,
    handleCopy,
    handleInstagramClick,
    generateOrderTemplate,
    updateQuantity,
    deselectPostcard,
    clearAllSelected,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
}
