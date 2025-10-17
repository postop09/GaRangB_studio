'use client';

import { useState, memo } from 'react';
import { Postcard, WallPostcard } from '@/shared/types';
import { postcardsData } from '@/shared/data/postcards';
import { GalleryCanvas } from '@/widgets/gallery-canvas/ui';
import { PostcardGrid } from '@/shared/ui';
import { usePostcardContext } from '@/app/providers/PostcardProvider';
import { APP_CONFIG } from '@/shared/config/constants';
import { cn } from '@/shared/lib/utils';

interface WallPageProps {
  // 하위 호환성을 위해 유지
  wallPostcards?: WallPostcard[];
  onUpdateWallPostcards?: (postcards: WallPostcard[]) => void;
  onRemovePostcard?: (instanceId: number) => void;
}

export const WallPage = memo<WallPageProps>(
  ({
    wallPostcards: propWallPostcards,
    onUpdateWallPostcards: propOnUpdateWallPostcards,
    onRemovePostcard: propOnRemovePostcard,
  }) => {
    // Context API 사용
    const {
      wallPostcards: contextWallPostcards,
      updateWallPostcards: contextUpdateWallPostcards,
      removeWallPostcard: contextRemoveWallPostcard,
      selectedPostcardId,
      selectPostcard,
      addToWall,
    } = usePostcardContext();

    // Props 또는 Context에서 데이터 선택 (하위 호환성)
    const wallPostcards = propWallPostcards || contextWallPostcards;
    const updateWallPostcards =
      propOnUpdateWallPostcards || contextUpdateWallPostcards;
    const removeWallPostcard =
      propOnRemovePostcard || contextRemoveWallPostcard;

    const [wallColor, setWallColor] = useState<string>(
      APP_CONFIG.wall.defaultColor
    );

    const updateWallColor = (color: string) => {
      setWallColor(color);
    };

    const resetWall = () => {
      updateWallPostcards([]);
      setWallColor(APP_CONFIG.wall.defaultColor);
      selectPostcard(null);
    };

    const handleRemovePostcard = (instanceId: number) => {
      removeWallPostcard(instanceId);
      if (selectedPostcardId === instanceId) {
        selectPostcard(null);
      }
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
      // Context API를 사용하여 포스트카드 추가
      addToWall(postcard);
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* 페이지 헤더 */}
        <header className="text-center mb-12 animate-fade-in-up">
          <h1 className="font-brand text-4xl font-semibold text-[#2c2c2c] mb-4">
            나만의 갤러리 꾸미기
          </h1>
          <p className="font-brand-subtitle text-sm text-[#6b6b6b] max-w-2xl mx-auto">
            사진 속 이야기들을 담은 엽서들로 나만의 감성적인 공간을 만들어보세요
          </p>
        </header>

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
            selectedPostcardId={selectedPostcardId}
            data-testid="gallery-canvas"
          />
        </section>
      </div>
    );
  }
);

WallPage.displayName = 'WallPage';
