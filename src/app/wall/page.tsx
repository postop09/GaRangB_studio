'use client';

import { AppLayout } from '@/widgets/app-layout/ui';
import { usePostcardContext } from '@/app/providers';
import { WallPage } from './ui/WallPage';

export default function WallGalleryPage() {
  const { wallPostcards, updateWallPostcards, removeWallPostcard } =
    usePostcardContext();

  return (
    <AppLayout>
      <WallPage
        wallPostcards={wallPostcards}
        onUpdateWallPostcards={updateWallPostcards}
        onRemovePostcard={removeWallPostcard}
      />
    </AppLayout>
  );
}
