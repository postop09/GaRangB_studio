'use client';

import { AppLayout } from '@/widgets/app-layout/ui';
import { useState, useCallback, useEffect } from 'react';
import { Postcard, WallPostcard } from '@/shared/types';
import { postcardsData } from '@/shared/data/postcards';
import { GalleryCanvas } from '@/widgets/gallery-canvas/ui';
import { PostcardGrid } from '@/shared/ui';
import { APP_CONFIG } from '@/shared/config/constants';
import {
  createWallPostcard,
  findNonOverlappingPosition,
  storage,
} from '@/shared/lib/utils';
import TitleSection from './ui/TitleSection';

export default function WallGalleryPage() {
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

  const updateWallColor = (color: string) => {
    setWallColor(color);
  };

  const updateWallPostcards = useCallback((postcards: WallPostcard[]) => {
    setWallPostcards(postcards);
    setSelectedPostcardId(null); // 업데이트 시 선택 해제
  }, []);

  const removeWallPostcard = useCallback(
    (instanceId: number) => {
      setWallPostcards(prev => prev.filter(p => p.instanceId !== instanceId));
      if (selectedPostcardId === instanceId) {
        setSelectedPostcardId(null);
      }
    },
    [selectedPostcardId]
  );

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

  const resetWall = () => {
    setWallPostcards([]);
    setWallColor(APP_CONFIG.wall.defaultColor);
    setSelectedPostcardId(null);
  };

  const handleRemovePostcard = (instanceId: number) => {
    removeWallPostcard(instanceId);
  };

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

  const handleSelectPostcard = (instanceId: number) => {
    selectPostcard(instanceId);
  };

  const handleAddPostcardToWall = (postcard: Postcard) => {
    addToWall(postcard);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
        {/* 페이지 헤더 */}
        <TitleSection />

        {/* 설정 및 도구 영역 */}
        <section className="flex flex-col md:flex-row gap-6 mb-8 p-6 bg-white rounded-2xl shadow-sm border border-[#e8ddd4] hover-lift">
          {/* 배경색 설정 */}
          <div className="flex items-center space-x-4">
            <label
              htmlFor="wall-color"
              className="font-medium text-[#2c2c2c] text-sm"
            >
              갤러리 배경:
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                id="wall-color"
                value={wallColor}
                onChange={e => updateWallColor(e.target.value)}
                className="w-12 h-12 rounded-full border-2 border-[#e8ddd4] cursor-pointer hover:border-[#8b7355] transition-colors"
                aria-label="갤러리 배경색 선택"
              />
              <span className="text-xs text-[#6b6b6b]">색상 선택</span>
            </div>
          </div>

          {/* 초기화 버튼 */}
          <button
            onClick={resetWall}
            className="btn-primary"
            aria-label="갤러리 초기화"
            type="button"
          >
            갤러리 초기화
          </button>
        </section>

        {/* 엽서 선택 섹션 */}
        <section className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-[#e8ddd4] hover-lift">
          <header className="mb-6">
            <h2 className="font-brand text-xl font-semibold text-[#2c2c2c] mb-2">
              엽서 선택하기
            </h2>
            <p className="text-sm text-[#6b6b6b]">
              아래 엽서를 클릭하여 갤러리에 추가할 수 있습니다
            </p>
          </header>

          <PostcardGrid
            postcards={postcardsData}
            onAddToWall={handleAddPostcardToWall}
            columns={6}
            variant="compact"
            showPrice={false}
            showAddToWall={true}
            data-testid="wall-postcard-selector"
          />
        </section>

        {/* 갤러리 캔버스 */}
        <section aria-label="포스트카드 갤러리">
          <GalleryCanvas
            wallPostcards={wallPostcards}
            wallColor={wallColor}
            onUpdateWallPostcards={updateWallPostcards}
            onRemovePostcard={handleRemovePostcard}
            onRotatePostcard={rotateWallPostcard}
            onSelectPostcard={handleSelectPostcard}
            selectedPostcardId={selectedPostcardId ?? undefined}
            data-testid="gallery-canvas"
          />
        </section>
      </div>
    </AppLayout>
  );
}
