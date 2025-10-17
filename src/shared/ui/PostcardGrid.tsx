'use client';

import { memo } from 'react';
import type { Postcard } from '../types';
import { PostcardCard } from './PostcardCard';
import type { BaseComponentProps } from '../types';

interface PostcardGridProps extends BaseComponentProps {
  postcards: Postcard[];
  onAddToWall?: (postcard: Postcard) => void;
  onRemove?: (id: number) => void;
  selectedPostcardIds?: number[];
  showPrice?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  loading?: boolean;
  showAddToWall?: boolean; // 갤러리 추가 버튼 표시 여부
}

export const PostcardGrid = memo<PostcardGridProps>(
  ({
    postcards,
    onAddToWall,
    onRemove,
    selectedPostcardIds = [],
    showPrice = true,
    variant = 'default',
    columns = 4,
    loading = false,
    showAddToWall = true,
    className,
    'data-testid': testId,
  }) => {
    const getGridColumns = () => {
      switch (columns) {
        case 1:
          return 'grid-cols-1';
        case 2:
          return 'grid-cols-1 md:grid-cols-2';
        case 3:
          return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
        case 5:
          return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
        case 6:
          return 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6';
        default:
          return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      }
    };

    if (loading) {
      return (
        <div
          className={`grid ${getGridColumns()} gap-8 ${className || ''}`}
          data-testid={testId}
          role="grid"
          aria-label="포스트카드 그리드 로딩 중"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 animate-pulse rounded-2xl aspect-[3/4]"
              role="gridcell"
              aria-label="로딩 중인 포스트카드"
            />
          ))}
        </div>
      );
    }

    if (postcards.length === 0) {
      return (
        <div
          className={`text-center py-16 ${className || ''}`}
          data-testid={testId}
          role="region"
          aria-label="포스트카드 없음"
        >
          <div className="text-gray-500">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-lg font-medium text-gray-900 mb-2">
              포스트카드가 없습니다
            </p>
            <p className="text-sm text-gray-500">
              새로운 포스트카드를 추가해보세요.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`grid ${getGridColumns()} gap-8 ${className || ''}`}
        data-testid={testId}
        role="grid"
        aria-label="포스트카드 컬렉션"
      >
        {postcards.map((postcard, index) => (
          <PostcardCard
            key={postcard.id}
            postcard={postcard}
            onAddToWall={onAddToWall}
            onRemove={onRemove}
            isSelected={selectedPostcardIds.includes(postcard.id)}
            showPrice={showPrice}
            variant={variant}
            showAddToWall={showAddToWall}
            data-testid={`postcard-${postcard.id}`}
            className={`animate-fade-in-up ${index * 0.1}s`}
          />
        ))}
      </div>
    );
  }
);

PostcardGrid.displayName = 'PostcardGrid';
