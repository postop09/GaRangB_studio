import { useState, useCallback } from 'react';
import { Postcard, WallPostcard } from '@/shared/types';
import { APP_CONFIG } from '@/shared/config/constants';
import {
  createWallPostcard,
  findNonOverlappingPosition,
} from '@/shared/lib/utils';

export const useWallGallery = () => {
  // 로컬 상태 관리
  const [wallPostcards, setWallPostcards] = useState<WallPostcard[]>([]);
  const [wallColor, setWallColor] = useState<string>(
    APP_CONFIG.wall.defaultColor
  );
  const [isUploading, setIsUploading] = useState(false);

  // 배경색 업데이트
  const updateWallColor = (color: string) => {
    setWallColor(color);
  };

  // 포스트카드 목록 업데이트
  const updateWallPostcards = (postcards: WallPostcard[]) => {
    setWallPostcards(postcards);
  };

  // 포스트카드 제거
  const removeWallPostcard = (instanceId: number) => {
    setWallPostcards(prev => prev.filter(p => p.instanceId !== instanceId));
  };

  // 포스트카드 선택
  const selectPostcard = (instanceId: number | null) => {
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
  };

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

  // 이미지 파일 업로드
  const handleImageUpload = useCallback(
    async (file: File) => {
      try {
        setIsUploading(true);

        // 파일 유효성 검사
        if (!file.type.startsWith('image/')) {
          alert('이미지 파일만 업로드할 수 있습니다.');
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          alert('파일 크기는 5MB 이하여야 합니다.');
          return;
        }

        // 이미지 크기 확인 및 회전 처리
        const processedImageUrl = await new Promise<string>(
          (resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              if (!ctx) {
                reject(new Error('Canvas context를 가져올 수 없습니다.'));
                return;
              }

              // 가로 이미지인지 확인 (가로가 세로보다 긴 경우)
              const isLandscape = img.width > img.height;

              if (isLandscape) {
                // 가로 이미지인 경우 90도 회전하여 세로로 만들기
                canvas.width = img.height;
                canvas.height = img.width;

                // 90도 회전하여 그리기 (반시계방향)
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(-Math.PI / 2);
                ctx.drawImage(img, -img.width / 2, -img.height / 2);
              } else {
                // 세로 이미지인 경우 그대로 그리기
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
              }

              // 처리된 이미지를 base64로 변환
              const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
              resolve(dataUrl);
            };

            img.onerror = () =>
              reject(new Error('이미지 로드에 실패했습니다.'));
            img.src = URL.createObjectURL(file);
          }
        );

        // 업로드된 이미지를 Postcard 형태로 변환하여 갤러리에 추가
        const uploadedPostcard: Postcard = {
          id: Date.now(), // 고유 ID 생성
          title: file.name.replace(/\.[^/.]+$/, ''), // 확장자 제거
          image: processedImageUrl,
          theme: '기타',
          price: 0,
          description: '업로드된 이미지',
        };

        // 갤러리에 추가
        addToWall(uploadedPostcard);

        console.log('이미지 업로드 완료:', file.name);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsUploading(false);
      }
    },
    [addToWall]
  );

  // 갤러리 초기화
  const resetWall = () => {
    setWallPostcards([]);
    setWallColor(APP_CONFIG.wall.defaultColor);
  };

  // 포스트카드 회전
  const rotateWallPostcard = (instanceId: number) => {
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
  };

  // 이벤트 핸들러들 (단순 래퍼이므로 직접 함수 사용)
  const handleRemovePostcard = removeWallPostcard;
  const handleSelectPostcard = selectPostcard;
  const handleAddPostcardToWall = addToWall;

  return {
    // 상태
    wallPostcards,
    wallColor,
    isUploading,

    // 액션
    updateWallColor,
    updateWallPostcards,
    removeWallPostcard,
    selectPostcard,
    addToWall,
    resetWall,
    rotateWallPostcard,
    handleImageUpload,

    // 이벤트 핸들러
    handleRemovePostcard,
    handleSelectPostcard,
    handleAddPostcardToWall,
  };
};
