'use client';

import { memo } from 'react';
import Image from 'next/image';
import type { PostcardCardProps } from '../types';
import { formatPrice, getFallbackImageUrl, cn } from '../lib/utils';

export const PostcardCard = memo<PostcardCardProps>(
  ({
    postcard,
    onAddToWall,
    onRemove,
    onToggle,
    isSelected = false,
    showPrice = true,
    variant = 'default',
    showAddToWall = true,
    className,
    'data-testid': testId,
  }) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      const target = e.target as HTMLImageElement;
      target.src = getFallbackImageUrl(postcard.title);
    };

    const handleAddToWall = () => {
      onAddToWall?.(postcard);
    };

    const handleRemove = () => {
      onRemove?.(postcard.id);
    };

    const handleToggle = () => {
      onToggle?.(postcard);
    };

    const getVariantClasses = () => {
      switch (variant) {
        case 'compact':
          return 'p-2';
        case 'detailed':
          return 'p-6';
        default:
          return 'p-4';
      }
    };

    return (
      <article
        className={cn(
          'group bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-[#f0f0f0] hover-lift',
          isSelected && 'ring-2 ring-[#8b7355] shadow-lg',
          onAddToWall &&
            variant === 'compact' &&
            showAddToWall &&
            'cursor-pointer',
          getVariantClasses(),
          className
        )}
        data-testid={testId}
        role="article"
        aria-label={`포스트카드: ${postcard.title}`}
        onClick={
          onToggle
            ? handleToggle
            : onAddToWall && variant === 'compact' && showAddToWall
            ? handleAddToWall
            : undefined
        }
      >
        {/* 이미지 영역 */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={postcard.image}
            alt={postcard.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={handleImageError}
            priority={false}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />

          {/* 호버 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-sm opacity-90">#{postcard.theme}</p>
            </div>
          </div>

          {/* 선택 표시 */}
          {isSelected && (
            <div className="absolute top-2 left-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
              ✓
            </div>
          )}

          {/* 액션 버튼들 */}
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {onRemove && (
              <button
                onClick={handleRemove}
                className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium hover:bg-red-600 transition-colors"
                aria-label={`${postcard.title} 제거`}
                type="button"
              >
                ×
              </button>
            )}
          </div>

          {/* 클릭 시 추가 표시 */}
          {onAddToWall && variant === 'compact' && showAddToWall && (
            <div className="absolute inset-0 bg-[#8b7355]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-[#8b7355] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                갤러리에 추가
              </div>
            </div>
          )}
        </div>

        {/* 콘텐츠 영역 */}
        <div className="space-y-3 mt-2">
          <h3 className="font-brand text-xl font-semibold text-[#2c2c2c] line-clamp-2">
            {postcard.title}
          </h3>

          <p className="text-sm text-[#6b6b6b] line-clamp-2">
            {postcard.description || '사진 속에 담긴 특별한 순간의 이야기'}
          </p>

          {/* 가격 및 버튼 */}
          <div className="flex items-center justify-between">
            {showPrice && (
              <span className="font-semibold text-[#8b7355] text-lg">
                {formatPrice(postcard.price)}
              </span>
            )}
          </div>

          {onAddToWall && variant !== 'compact' && showAddToWall && (
            <button
              onClick={handleAddToWall}
              className="w-full btn-primary group-hover:shadow-md"
              type="button"
              aria-label={`${postcard.title}을 갤러리에 추가`}
            >
              갤러리에 배치하기
            </button>
          )}
        </div>
      </article>
    );
  }
);

PostcardCard.displayName = 'PostcardCard';
