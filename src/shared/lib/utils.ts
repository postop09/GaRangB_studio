import type {
  Position,
  Size,
  Bounds,
  WallPostcard,
  Postcard,
  PostcardRotation,
  PostcardTheme,
} from '../types';
import { APP_CONFIG } from '../config/constants';

/**
 * 범위 내 값으로 제한하는 유틸리티 함수
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * 엽서의 기본 크기를 계산하는 함수
 */
export function getDefaultPostcardSize(): Size {
  return { ...APP_CONFIG.postcard.defaultSize };
}

/**
 * 새로운 인스턴스 ID 생성 (타임스탬프 + 랜덤)
 */
export function generateInstanceId(): number {
  return Date.now() + Math.random();
}

/**
 * 엽서의 초기 위치를 계산하는 함수
 */
export function calculateInitialPosition(
  index: number,
  offset: number = 20
): Position {
  return {
    x: 50 + index * offset,
    y: 50, // y축은 고정하여 가로로 배치
  };
}

/**
 * 다음 회전 각도 계산
 */
export function getNextRotation(
  currentRotation: PostcardRotation
): PostcardRotation {
  const rotations: PostcardRotation[] = [0, 90, 180, 270];
  const currentIndex = rotations.indexOf(currentRotation);
  const nextIndex = (currentIndex + 1) % rotations.length;
  return rotations[nextIndex];
}

/**
 * 포스트카드가 캔버스 경계 내에 있는지 확인
 */
export function isPositionWithinBounds(
  position: Position,
  size: Size,
  canvasSize: Size
): boolean {
  return (
    position.x >= 0 &&
    position.y >= 0 &&
    position.x + size.width <= canvasSize.width &&
    position.y + size.height <= canvasSize.height
  );
}

/**
 * 포스트카드 위치를 캔버스 경계 내로 조정
 */
export function clampPositionToBounds(
  position: Position,
  size: Size,
  canvasSize: Size
): Position {
  return {
    x: clamp(position.x, 0, canvasSize.width - size.width),
    y: clamp(position.y, 0, canvasSize.height - size.height),
  };
}

/**
 * 포스트카드 크기를 최소/최대 범위 내로 제한
 */
export function clampSizeToBounds(size: Size): Size {
  return {
    width: clamp(
      size.width,
      APP_CONFIG.postcard.minSize.width,
      APP_CONFIG.postcard.maxSize.width
    ),
    height: clamp(
      size.height,
      APP_CONFIG.postcard.minSize.height,
      APP_CONFIG.postcard.maxSize.height
    ),
  };
}

/**
 * 두 포스트카드가 겹치는지 확인
 */
export function isOverlapping(
  postcard1: WallPostcard,
  postcard2: WallPostcard
): boolean {
  const bounds1: Bounds = {
    minX: postcard1.x,
    minY: postcard1.y,
    maxX: postcard1.x + postcard1.width,
    maxY: postcard1.y + postcard1.height,
  };

  const bounds2: Bounds = {
    minX: postcard2.x,
    minY: postcard2.y,
    maxX: postcard2.x + postcard2.width,
    maxY: postcard2.y + postcard2.height,
  };

  return !(
    bounds1.maxX <= bounds2.minX ||
    bounds2.maxX <= bounds1.minX ||
    bounds1.maxY <= bounds2.minY ||
    bounds2.maxY <= bounds1.minY
  );
}

/**
 * 겹치지 않는 위치 찾기
 */
export function findNonOverlappingPosition(
  newPostcard: WallPostcard,
  existingPostcards: WallPostcard[],
  canvasSize: Size
): Position {
  let position = { x: newPostcard.x, y: newPostcard.y };
  let attempts = 0;
  const maxAttempts = 100;

  while (
    existingPostcards.some(postcard =>
      isOverlapping({ ...newPostcard, ...position }, postcard)
    ) &&
    attempts < maxAttempts
  ) {
    position = calculateInitialPosition(attempts, 30);
    position = clampPositionToBounds(
      position,
      { width: newPostcard.width, height: newPostcard.height },
      canvasSize
    );
    attempts++;
  }

  return position;
}

/**
 * 포스트카드를 WallPostcard로 변환
 */
export function createWallPostcard(
  postcard: Postcard,
  position?: Position,
  index?: number
): WallPostcard {
  const defaultSize = getDefaultPostcardSize();
  const finalPosition = position || calculateInitialPosition(index || 0);

  return {
    instanceId: generateInstanceId(),
    postcardId: postcard.id,
    image: postcard.image,
    title: postcard.title,
    x: finalPosition.x,
    y: finalPosition.y,
    rotation: 0,
    width: defaultSize.width,
    height: defaultSize.height,
    zIndex: APP_CONFIG.ui.zIndex.default,
    isSelected: false,
  };
}

/**
 * 포스트카드 배열을 테마별로 그룹화
 */
export function groupPostcardsByTheme(
  postcards: Postcard[]
): Record<PostcardTheme, Postcard[]> {
  return postcards.reduce((groups, postcard) => {
    const theme = postcard.theme;
    if (!groups[theme]) {
      groups[theme] = [];
    }
    groups[theme].push(postcard);
    return groups;
  }, {} as Record<PostcardTheme, Postcard[]>);
}

/**
 * 포스트카드 검색 (제목, 설명, 테마 기준)
 */
export function searchPostcards(
  postcards: Postcard[],
  query: string
): Postcard[] {
  if (!query.trim()) return postcards;

  const lowercaseQuery = query.toLowerCase();
  return postcards.filter(
    postcard =>
      postcard.title.toLowerCase().includes(lowercaseQuery) ||
      postcard.description.toLowerCase().includes(lowercaseQuery) ||
      postcard.theme.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * 포스트카드 정렬
 */
export function sortPostcards(
  postcards: Postcard[],
  sortBy: 'title' | 'theme' | 'price' | 'date',
  order: 'asc' | 'desc' = 'asc'
): Postcard[] {
  return [...postcards].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'theme':
        comparison = a.theme.localeCompare(b.theme);
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'date':
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        comparison = dateA - dateB;
        break;
    }

    return order === 'desc' ? -comparison : comparison;
  });
}

/**
 * 포스트카드 가격 포맷팅
 */
export function formatPrice(price: number): string {
  return `${price.toLocaleString()}원`;
}

/**
 * 이미지 로딩 실패 시 기본 이미지 URL 생성
 */
export function getFallbackImageUrl(
  title: string,
  size: Size = { width: 250, height: 350 }
): string {
  const encodedTitle = encodeURIComponent(title);
  return `https://placehold.co/${size.width}x${size.height}/999999/FFFFFF?text=${encodedTitle}`;
}

/**
 * 클래스명 조합 유틸리티
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * 디바운스 함수
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 쓰로틀 함수
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * 로컬 스토리지 유틸리티
 */
export const storage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  },
};
