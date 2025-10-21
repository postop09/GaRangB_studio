import { GalleryCanvas } from '@/widgets';
import { WallPostcard } from '@/shared/types';
import React from 'react';

interface PostCanvasProps {
  wallPostcards: WallPostcard[];
  wallColor: string;
  onUpdateWallPostcards: (postcards: WallPostcard[]) => void;
  onRemovePostcard: (instanceId: number) => void;
  onRotatePostcard: (instanceId: number) => void;
  onSelectPostcard: (instanceId: number) => void;
}

const PostCanvas = ({
  wallPostcards,
  wallColor,
  onUpdateWallPostcards,
  onRemovePostcard,
  onRotatePostcard,
  onSelectPostcard,
}: PostCanvasProps) => {
  return (
    <section aria-label="포스트카드 갤러리">
      <h2 className="hidden">나만의 벽 꾸미기</h2>
      <GalleryCanvas
        wallPostcards={wallPostcards}
        wallColor={wallColor}
        onUpdateWallPostcards={onUpdateWallPostcards}
        onRemovePostcard={onRemovePostcard}
        onRotatePostcard={onRotatePostcard}
        onSelectPostcard={onSelectPostcard}
        data-testid="gallery-canvas"
      />
    </section>
  );
};

export default PostCanvas;
