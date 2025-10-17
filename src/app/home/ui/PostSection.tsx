'use client';

import { PostcardGrid } from '@/shared/ui';
import { postcardsData } from '@/shared';

function PostSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
        columns={4}
        showPrice={true}
        variant="default"
        showAddToWall={false}
        data-testid="postcard-grid"
      />
    </section>
  );
}

export default PostSection;
