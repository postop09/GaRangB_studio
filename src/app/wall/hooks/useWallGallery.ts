import { useState, useCallback, useEffect } from 'react';
import { Postcard, WallPostcard } from '@/shared/types';
import { APP_CONFIG } from '@/shared/config/constants';
import {
  createWallPostcard,
  findNonOverlappingPosition,
  storage,
} from '@/shared/lib/utils';

export const useWallGallery = () => {
  // 로컬 상태 관리
  const [wallPostcards, setWallPostcards] = useState<WallPostcard[]>([]);
  const [selectedPostcardId, setSelectedPostcardId] = useState<number | null>(
    null
  );
  const [wallColor, setWallColor] = useState<string>(
    APP_CONFIG.wall.defaultColor
  );

  // 로컬 스토리지에서 상태 복원
  useEffect(() => {
    const savedPostcards = storage.get<WallPostcard[]>('wallPostcards', []);
    setWallPostcards(savedPostcards);
  }, []);

  // 상태 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    if (wallPostcards.length > 0) {
      storage.set('wallPostcards', wallPostcards);
    }
  }, [wallPostcards]);

  // 배경색 업데이트
  const updateWallColor = useCallback((color: string) => {
    setWallColor(color);
  }, []);

  // 포스트카드 목록 업데이트
  const updateWallPostcards = useCallback((postcards: WallPostcard[]) => {
    setWallPostcards(postcards);
    setSelectedPostcardId(null); // 업데이트 시 선택 해제
  }, []);

  // 포스트카드 제거
  const removeWallPostcard = useCallback(
    (instanceId: number) => {
      setWallPostcards(prev => prev.filter(p => p.instanceId !== instanceId));
      if (selectedPostcardId === instanceId) {
        setSelectedPostcardId(null);
      }
    },
    [selectedPostcardId]
  );

  // 포스트카드 선택
  const selectPostcard = useCallback((instanceId: number | null) => {
    setSelectedPostcardId(instanceId);
    setWallPostcards(prev =>
      prev.map(postcard => ({
        ...postcard,
        isSelected: postcard.instanceId === instanceId,
        zIndex:
          postcard.instanceId === instanceId
            ? APP_CONFIG.ui.zIndex.selected
            : APP_CONFIG.ui.zIndex.default,
      }))
    );
  }, []);

  // 갤러리에 포스트카드 추가
  const addToWall = useCallback(
    (postcard: Postcard) => {
      try {
        // 기존 포스트카드와 겹치지 않는 위치 찾기
        const canvasSize = { width: 800, height: 600 };
        const newWallPostcard = createWallPostcard(
          postcard,
          undefined,
          wallPostcards.length
        );

        const nonOverlappingPosition = findNonOverlappingPosition(
          newWallPostcard,
          wallPostcards,
          canvasSize
        );

        const finalWallPostcard = {
          ...newWallPostcard,
          ...nonOverlappingPosition,
        };

        setWallPostcards(prev => [...prev, finalWallPostcard]);
      } catch (error) {
        console.error('포스트카드 추가 중 오류가 발생했습니다:', error);
      }
    },
    [wallPostcards]
  );

  // 갤러리 초기화
  const resetWall = useCallback(() => {
    setWallPostcards([]);
    setWallColor(APP_CONFIG.wall.defaultColor);
    setSelectedPostcardId(null);
  }, []);

  // 포스트카드 회전
  const rotateWallPostcard = useCallback(
    (instanceId: number) => {
      const updatedPostcards = wallPostcards.map(postcard => {
        if (postcard.instanceId === instanceId) {
          return {
            ...postcard,
            rotation: ((postcard.rotation + 90) % 360) as 0 | 90 | 180 | 270,
          };
        }
        return postcard;
      });
      updateWallPostcards(updatedPostcards);
    },
    [wallPostcards, updateWallPostcards]
  );

  // 이벤트 핸들러들
  const handleRemovePostcard = useCallback(
    (instanceId: number) => {
      removeWallPostcard(instanceId);
    },
    [removeWallPostcard]
  );

  const handleSelectPostcard = useCallback(
    (instanceId: number) => {
      selectPostcard(instanceId);
    },
    [selectPostcard]
  );

  const handleAddPostcardToWall = useCallback(
    (postcard: Postcard) => {
      addToWall(postcard);
    },
    [addToWall]
  );

  return {
    // 상태
    wallPostcards,
    selectedPostcardId,
    wallColor,

    // 액션
    updateWallColor,
    updateWallPostcards,
    removeWallPostcard,
    selectPostcard,
    addToWall,
    resetWall,
    rotateWallPostcard,

    // 이벤트 핸들러
    handleRemovePostcard,
    handleSelectPostcard,
    handleAddPostcardToWall,
  };
};
