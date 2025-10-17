import type { AppConfig } from '../types';

export const APP_CONFIG: AppConfig = {
  postcard: {
    defaultSize: {
      width: 150,
      height: 210,
    },
    minSize: {
      width: 80,
      height: 112,
    },
    maxSize: {
      width: 300,
      height: 420,
    },
    rotationStep: 90,
  },
  wall: {
    defaultColor: '#ffffff',
    minHeight: 600,
  },
  ui: {
    zIndex: {
      default: 10,
      dragging: 100,
      selected: 50,
    },
  },
} as const;

// 하위 호환성을 위한 기존 상수들 (deprecated)
/** @deprecated Use APP_CONFIG.postcard.defaultSize.width instead */
export const POSTCARD_CONFIG = {
  DEFAULT_WIDTH: APP_CONFIG.postcard.defaultSize.width,
  DEFAULT_HEIGHT: APP_CONFIG.postcard.defaultSize.height,
  MIN_WIDTH: APP_CONFIG.postcard.minSize.width,
  MAX_WIDTH: APP_CONFIG.postcard.maxSize.width,
  MIN_HEIGHT: APP_CONFIG.postcard.minSize.height,
  MAX_HEIGHT: APP_CONFIG.postcard.maxSize.height,
  ROTATION_STEP: APP_CONFIG.postcard.rotationStep,
} as const;

/** @deprecated Use APP_CONFIG.wall.defaultColor instead */
export const WALL_CONFIG = {
  DEFAULT_COLOR: APP_CONFIG.wall.defaultColor,
  MIN_HEIGHT: APP_CONFIG.wall.minHeight,
} as const;

/** @deprecated Use APP_CONFIG.ui.zIndex instead */
export const UI_CONFIG = {
  Z_INDEX: APP_CONFIG.ui.zIndex,
} as const;

// 테마 관련 상수
export const POSTCARD_THEMES = [
  '가을',
  '사랑',
  '도시',
  '바다',
  '봄',
  '여름',
  '겨울',
  '기타',
] as const;

// 애니메이션 관련 상수
export const ANIMATION_CONFIG = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
} as const;

// 브레이크포인트
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
