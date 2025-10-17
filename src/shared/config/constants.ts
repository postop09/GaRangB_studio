export const POSTCARD_CONFIG = {
  DEFAULT_WIDTH: 150,
  DEFAULT_HEIGHT: 210,
  MIN_WIDTH: 80,
  MAX_WIDTH: 300,
  MIN_HEIGHT: 112,
  MAX_HEIGHT: 420,
  ROTATION_STEP: 90,
} as const;

export const WALL_CONFIG = {
  DEFAULT_COLOR: '#ffffff',
  MIN_HEIGHT: 600,
} as const;

export const UI_CONFIG = {
  Z_INDEX: {
    DEFAULT: 10,
    DRAGGING: 100,
  },
} as const;
