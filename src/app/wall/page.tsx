'use client';

import { AppLayout } from '@/widgets/app-layout/ui';
import { useWallGallery } from './hooks';
import TitleSection from './ui/TitleSection';
import ToolSection from './ui/ToolSection';
import PostSelectSection from './ui/PostSelectSection';
import ImageUploadSection from './ui/ImageUploadSection';
import PostCanvas from './ui/PostCanvas';

export default function WallGalleryPage() {
  const {
    // 상태
    wallPostcards,
    selectedPostcardId,
    wallColor,
    isUploading,
    // 액션
    updateWallColor,
    updateWallPostcards,
    resetWall,
    rotateWallPostcard,
    handleImageUpload,
    // 이벤트 핸들러
    handleRemovePostcard,
    handleSelectPostcard,
    handleAddPostcardToWall,
  } = useWallGallery();

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
        <TitleSection />
        <ToolSection
          wallColor={wallColor}
          onUpdateWallColor={updateWallColor}
          onResetWall={resetWall}
        />
        <PostSelectSection onAddToWall={handleAddPostcardToWall} />
        <ImageUploadSection
          onImageUpload={handleImageUpload}
          isUploading={isUploading}
        />
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
