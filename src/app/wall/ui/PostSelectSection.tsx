import { postcardsData } from '@/shared';
import { PostcardGrid } from '@/shared/ui';
import { Postcard } from '@/shared/types';
import React from 'react';

interface PostSelectSectionProps {
  onAddToWall: (postcard: Postcard) => void;
}

const PostSelectSection = ({ onAddToWall }: PostSelectSectionProps) => {
  return (
    <section className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-[#e8ddd4] hover-lift">
      <div className="mb-6">
        <h2 className="font-brand text-xl font-semibold text-[#2c2c2c] mb-2">
          엽서 선택하기
        </h2>
        <p className="text-sm text-[#6b6b6b]">
          아래 엽서를 클릭하여 갤러리에 추가할 수 있습니다
        </p>
      </div>

      <PostcardGrid
        postcards={postcardsData}
        onAddToWall={onAddToWall}
        columns={6}
        variant="compact"
        showPrice={false}
        showAddToWall={true}
        data-testid="wall-postcard-selector"
      />
    </section>
  );
};

export default PostSelectSection;
