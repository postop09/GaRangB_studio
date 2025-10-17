'use client';

import { AppLayout } from '@/widgets/app-layout/ui';
import { usePostcardContext } from '@/app/providers';
import { useNavigation } from '@/shared/lib/navigation';
import { MainPage } from './ui/MainPage';

export default function HomePage() {
  const { addToWall } = usePostcardContext();
  const { navigate } = useNavigation();

  const handleAddToWall = (id: number, image: string, title: string) => {
    addToWall(id, image, title);
    navigate('wall');
  };

  return (
    <AppLayout>
      <MainPage onAddToWall={handleAddToWall} />
    </AppLayout>
  );
}
