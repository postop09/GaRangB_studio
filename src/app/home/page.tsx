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
        data-testid="hero-section"
      />
      <PostSection />
      <StorySection />
    </AppLayout>
  );
}
