'use client';

import { useState } from 'react';
import { Postcard, WallPostcard } from '@/shared/types';
import { postcardsData } from '@/shared/data/postcards';
import { GalleryCanvas } from '@/widgets/gallery-canvas/ui';
import { WALL_CONFIG } from '@/shared/config/constants';
import {
  generateInstanceId,
  calculateInitialPosition,
  getDefaultPostcardSize,
} from '@/shared/lib/utils';

interface WallPageProps {
  wallPostcards: WallPostcard[];
  onUpdateWallPostcards: (postcards: WallPostcard[]) => void;
  onRemovePostcard: (instanceId: number) => void;
}

export function WallPage({
  wallPostcards,
  onUpdateWallPostcards,
  onRemovePostcard,
}: WallPageProps) {
  const [wallColor, setWallColor] = useState<string>(WALL_CONFIG.DEFAULT_COLOR);

  const updateWallColor = (color: string) => {
    setWallColor(color);
    console.log('Wall color updated to:', color);
  };

  const resetWall = () => {
    onUpdateWallPostcards([]);
    setWallColor(WALL_CONFIG.DEFAULT_COLOR);
  };

  const removeWallPostcard = (instanceId: number) => {
    onRemovePostcard(instanceId);
  };

  const addPostcardToGallery = (postcard: Postcard) => {
    const { width, height } = getDefaultPostcardSize();
    const { x, y } = calculateInitialPosition(wallPostcards.length);

    const newPostcard: WallPostcard = {
      instanceId: generateInstanceId(),
      postcardId: postcard.id,
      image: postcard.image,
      title: postcard.title,
      x,
      y,
      rotation: 0,
      width,
      height,
    };
    onUpdateWallPostcards([...wallPostcards, newPostcard]);
  };

  const rotateWallPostcard = (instanceId: number) => {
    const updatedPostcards = wallPostcards.map(postcard => {
      if (postcard.instanceId === instanceId) {
        return {
          ...postcard,
          rotation: (postcard.rotation + 90) % 360,
        };
      }
      return postcard;
    });
    onUpdateWallPostcards(updatedPostcards);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      {/* 페이지 헤더 */}
      <div className="text-center mb-12 animate-fade-in-up">
        <h3 className="font-brand text-4xl font-semibold text-[#2c2c2c] mb-4">
          나만의 갤러리 꾸미기
        </h3>
        <p className="font-brand-subtitle text-sm text-[#6b6b6b] max-w-2xl mx-auto">
          사진 속 이야기들을 담은 엽서들로 나만의 감성적인 공간을 만들어보세요
        </p>
      </div>

      {/* 설정 및 도구 영역 */}
      <div className="flex flex-col md:flex-row gap-6 mb-8 p-6 bg-white rounded-2xl shadow-sm border border-[#e8ddd4] hover-lift">
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
            />
            <span className="text-xs text-[#6b6b6b]">색상 선택</span>
          </div>
        </div>

        {/* 초기화 버튼 */}
        <button onClick={resetWall} className="btn-primary">
          갤러리 초기화
        </button>
      </div>

      {/* 엽서 선택 섹션 */}
      <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-[#e8ddd4] hover-lift">
        <h4 className="font-brand text-xl font-semibold text-[#2c2c2c] mb-4">
          엽서 선택하기
        </h4>
        <p className="text-sm text-[#6b6b6b] mb-6">
          아래 엽서를 클릭하여 갤러리에 추가할 수 있습니다
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {postcardsData.map(postcard => (
            <div
              key={postcard.id}
              className="group cursor-pointer"
              onClick={() => addPostcardToGallery(postcard)}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg border-2 border-[#e8ddd4] hover:border-[#8b7355] transition-all duration-300 hover:shadow-lg">
                <img
                  src={postcard.image}
                  alt={postcard.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/150x200/999999/FFFFFF?text=${postcard.title}`;
                  }}
                />
                {/* 호버 오버레이 */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 text-[#8b7355] px-3 py-1 rounded-full text-xs font-medium">
                      추가하기
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#6b6b6b] mt-2 text-center truncate">
                {postcard.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 갤러리 캔버스 */}
      <GalleryCanvas
        wallPostcards={wallPostcards}
        wallColor={wallColor}
        onUpdateWallPostcards={onUpdateWallPostcards}
        onRemovePostcard={removeWallPostcard}
        onRotatePostcard={rotateWallPostcard}
      />
    </div>
  );
}
