'use client';

import { PostcardGrid } from '@/shared/ui';
import { postcardsData, useSelectedPostcards } from '@/shared';
import { useRouter } from 'next/navigation';

function PostSection() {
  const router = useRouter();
  const {
    selectedPostcards,
    selectPostcard,
    deselectPostcard,
    isSelected,
    selectedCount,
  } = useSelectedPostcards();

  const handlePostcardToggle = (postcard: any) => {
    if (isSelected(postcard.id)) {
      deselectPostcard(postcard.id);
    } else {
      selectPostcard(postcard);
    }
  };

  const handleOrderClick = () => {
    router.push('/order');
  };

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

      {/* 선택된 엽서 정보 및 주문 버튼 */}
      {selectedCount > 0 && (
        <div className="mb-8 p-6 bg-blue-50 rounded-2xl border border-blue-200 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {selectedCount}
                  </span>
                </div>
                <span className="text-blue-700 font-medium">
                  {selectedCount}개의 엽서가 선택되었습니다
                </span>
              </div>
            </div>
            <button
              onClick={handleOrderClick}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              주문하기
            </button>
          </div>
        </div>
      )}

      {/* 포트폴리오 그리드 */}
      <PostcardGrid
        postcards={postcardsData}
        columns={4}
        showPrice={true}
        variant="default"
        showAddToWall={false}
        selectedPostcardIds={selectedPostcards.map(p => p.id)}
        onPostcardToggle={handlePostcardToggle}
        data-testid="postcard-grid"
      />
    </section>
  );
}

export default PostSection;
