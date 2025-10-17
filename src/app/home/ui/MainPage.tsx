'use client';

import { memo } from 'react';
import { postcardsData } from '@/shared/data/postcards';
import { usePostcardContext } from '@/app/providers/PostcardProvider';
import { HeroSection } from '@/shared/ui/HeroSection';
import { PostcardGrid } from '@/shared/ui/PostcardGrid';

interface MainPageProps {
  // 하위 호환성을 위해 유지
  onAddToWall?: (id: number, image: string, title: string) => void;
}

export const MainPage = memo<MainPageProps>(({ onAddToWall }) => {
  const { addToWall } = usePostcardContext();

  const handleAddToWall = (postcard: (typeof postcardsData)[0]) => {
    // 새로운 Context API 사용
    addToWall(postcard);

    // 하위 호환성을 위한 기존 API 호출
    onAddToWall?.(postcard.id, postcard.image, postcard.title);
  };

  return (
    <>
      {/* 브랜드 히어로 섹션 */}
      <HeroSection
        title="Ga.Rang.B"
        subtitle="Stories in Pictures"
        description={`한 장의 사진 속에\n이야기, 시간, 감정, 기억을\n담아`}
        data-testid="hero-section"
      />

      {/* 포트폴리오 갤러리 섹션 */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        role="region"
        aria-label="엽서 컬렉션"
      >
        {/* 섹션 헤더 */}
        <header className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-brand text-4xl md:text-5xl font-semibold text-[#2c2c2c] mb-6">
            엽서 컬렉션
          </h2>
          <p className="font-brand-subtitle text-sm text-[#6b6b6b] max-w-2xl mx-auto">
            각 사진 속에 담긴 이야기와 감정을 엽서로 만나보세요
          </p>
        </header>

        {/* 포트폴리오 그리드 */}
        <PostcardGrid
          postcards={postcardsData}
          onAddToWall={handleAddToWall}
          columns={4}
          showPrice={true}
          variant="default"
          data-testid="postcard-grid"
        />
      </section>

      {/* 브랜드 스토리 섹션 */}
      <section
        className="bg-[#f5f1eb] py-20"
        role="region"
        aria-label="브랜드 스토리"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="font-brand text-3xl md:text-4xl font-semibold text-[#2c2c2c] mb-8">
              Ga.Rang.B의 이야기
            </h2>
            <div className="space-y-6 text-[#6b6b6b] leading-relaxed">
              <blockquote className="text-lg italic">
                &quot;가랑비처럼 은은하게 내려앉는 순간들을 사진으로
                담습니다.&quot;
              </blockquote>
              <p>
                각 사진은 단순한 기록이 아닌, 그 순간의 감정과 이야기가 담긴
                작품입니다. 일상 속에서 발견하는 아름다운 순간들, 사람들의
                진실한 모습, 그리고 시간이 흘러도 잊히지 않을 특별한 기억들을
                카메라 렌즈를 통해 담아냅니다.
              </p>
              <p>
                엽서로 만나보는 이 사진들은 단순한 소통의 도구를 넘어, 받는
                이에게 따뜻한 위로와 기쁨을 전달하는 특별한 선물이 될 것입니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

MainPage.displayName = 'MainPage';
