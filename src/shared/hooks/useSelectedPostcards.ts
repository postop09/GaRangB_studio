'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Postcard } from '../types';

const STORAGE_KEY = 'selectedPostcards';

export interface SelectedPostcard extends Postcard {
  selectedAt: Date;
  quantity: number;
}

export function useSelectedPostcards() {
  const [selectedPostcards, setSelectedPostcards] = useState<
    SelectedPostcard[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  // 로컬스토리지에서 선택된 엽서 목록 로드
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Date 객체 복원
        const postcards = parsed.map((item: any) => ({
          ...item,
          selectedAt: new Date(item.selectedAt),
          createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
          updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
        }));
        setSelectedPostcards(postcards);
      }
    } catch (error) {
      console.error(
        '로컬스토리지에서 선택된 엽서 목록을 불러오는 중 오류:',
        error
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 로컬스토리지에 저장
  const saveToStorage = useCallback((postcards: SelectedPostcard[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(postcards));
    } catch (error) {
      console.error(
        '로컬스토리지에 선택된 엽서 목록을 저장하는 중 오류:',
        error
      );
    }
  }, []);

  // 엽서 선택
  const selectPostcard = useCallback(
    (postcard: Postcard) => {
      setSelectedPostcards(prev => {
        // 이미 선택된 엽서인지 확인
        const isAlreadySelected = prev.some(p => p.id === postcard.id);
        if (isAlreadySelected) {
          return prev;
        }

        const newSelected = [
          ...prev,
          {
            ...postcard,
            selectedAt: new Date(),
            quantity: 1,
          },
        ];
        saveToStorage(newSelected);
        return newSelected;
      });
    },
    [saveToStorage]
  );

  // 엽서 선택 해제
  const deselectPostcard = useCallback(
    (postcardId: number) => {
      setSelectedPostcards(prev => {
        const newSelected = prev.filter(p => p.id !== postcardId);
        saveToStorage(newSelected);
        return newSelected;
      });
    },
    [saveToStorage]
  );

  // 모든 엽서 선택 해제
  const clearAllSelected = useCallback(() => {
    setSelectedPostcards([]);
    saveToStorage([]);
  }, [saveToStorage]);

  // 엽서가 선택되었는지 확인
  const isSelected = useCallback(
    (postcardId: number) => {
      return selectedPostcards.some(p => p.id === postcardId);
    },
    [selectedPostcards]
  );

  // 선택된 엽서 개수
  const selectedCount = selectedPostcards.length;

  // 수량 업데이트
  const updateQuantity = useCallback(
    (postcardId: number, quantity: number) => {
      if (quantity < 1) return;

      setSelectedPostcards(prev => {
        const newSelected = prev.map(p =>
          p.id === postcardId ? { ...p, quantity } : p
        );
        saveToStorage(newSelected);
        return newSelected;
      });
    },
    [saveToStorage]
  );

  // 총 가격 계산 (수량 고려)
  const totalPrice = selectedPostcards.reduce(
    (sum, postcard) => sum + postcard.price * postcard.quantity,
    0
  );

  // 총 수량
  const totalQuantity = selectedPostcards.reduce(
    (sum, postcard) => sum + postcard.quantity,
    0
  );

  return {
    selectedPostcards,
    isLoading,
    selectPostcard,
    deselectPostcard,
    clearAllSelected,
    isSelected,
    selectedCount,
    updateQuantity,
    totalPrice,
    totalQuantity,
  };
}
