'use client';

import { AppLayout } from '@/widgets/app-layout/ui';
import { useNavigation } from '@/shared/lib/navigation';
import { MainPage } from './ui/MainPage';

export default function HomePage() {
  const { navigate } = useNavigation();

  const handleAddToWall = (id: number, image: string, title: string) => {
    // 새로운 Context API는 Postcard 객체를 받지만, 하위 호환성을 위해 유지
    console.log('Legacy addToWall called with:', { id, image, title });
    navigate('wall');
  };

  return (
    <AppLayout>
      <MainPage onAddToWall={handleAddToWall} />
    </AppLayout>
  );
}
