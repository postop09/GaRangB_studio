'use client';

import { AppLayout } from '@/widgets/app-layout/ui';
import HeroSection from './ui/HeroSection';
import PostSection from './ui/PostSection';
import StorySection from './ui/StorySection';

export default function HomePage() {
  return (
    <AppLayout>
      <HeroSection
        title="Ga.Rang.B"
        subtitle="Stories in Pictures"
        description={`한 장의 사진 속에\n이야기, 시간, 감정, 기억을\n담아`}
        data-testid="hero-section"
      />
      <PostSection />
      <StorySection />
    </AppLayout>
  );
}
