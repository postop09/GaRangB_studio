import { GalleryCanvas } from '@/widgets';
import { WallPostcard } from '@/shared/types';
import React from 'react';

interface PostCanvasProps {
  wallPostcards: WallPostcard[];
  wallColor: string;
  selectedPostcardId: number | null;
  onUpdateWallPostcards: (postcards: WallPostcard[]) => void;
  onRemovePostcard: (instanceId: number) => void;
  onRotatePostcard: (instanceId: number) => void;
  onSelectPostcard: (instanceId: number) => void;
}

const PostCanvas = ({
  wallPostcards,
  wallColor,
  selectedPostcardId,
  onUpdateWallPostcards,
  onRemovePostcard,
  onRotatePostcard,
  onSelectPostcard,
}: PostCanvasProps) => {
  return (
    <section aria-label="포스트카드 갤러리">
      <GalleryCanvas
        wallPostcards={wallPostcards}
        wallColor={wallColor}
        onUpdateWallPostcards={onUpdateWallPostcards}
        onRemovePostcard={onRemovePostcard}
        onRotatePostcard={onRotatePostcard}
        onSelectPostcard={onSelectPostcard}
        selectedPostcardId={selectedPostcardId ?? undefined}
        data-testid="gallery-canvas"
      />
    </section>
  );
};

export default PostCanvas;
