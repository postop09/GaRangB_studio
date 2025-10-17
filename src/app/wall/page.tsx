'use client';

import { AppLayout } from '@/widgets/app-layout/ui';
import { useWallGallery } from './hooks';
import TitleSection from './ui/TitleSection';
import ToolSection from './ui/ToolSection';
import PostSelectSection from './ui/PostSelectSection';
import PostCanvas from './ui/PostCanvas';

export default function WallGalleryPage() {
  const {
    // 상태
    wallPostcards,
    selectedPostcardId,
    wallColor,

    // 액션
    updateWallColor,
    updateWallPostcards,
    resetWall,
    rotateWallPostcard,

    // 이벤트 핸들러
    handleRemovePostcard,
    handleSelectPostcard,
    handleAddPostcardToWall,
  } = useWallGallery();

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
        {/* 페이지 헤더 */}
        <TitleSection />

        {/* 설정 및 도구 영역 */}
        <ToolSection
          wallColor={wallColor}
          onUpdateWallColor={updateWallColor}
          onResetWall={resetWall}
        />

        {/* 엽서 선택 섹션 */}
        <PostSelectSection onAddToWall={handleAddPostcardToWall} />

        {/* 갤러리 캔버스 */}
        <PostCanvas
          wallPostcards={wallPostcards}
          wallColor={wallColor}
          selectedPostcardId={selectedPostcardId}
          onUpdateWallPostcards={updateWallPostcards}
          onRemovePostcard={handleRemovePostcard}
          onRotatePostcard={rotateWallPostcard}
          onSelectPostcard={handleSelectPostcard}
        />
      </div>
    </AppLayout>
  );
}
