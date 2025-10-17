// 기본 엔티티 타입들
export interface Postcard {
  readonly id: number;
  title: string;
  theme: PostcardTheme;
  price: number;
  image: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface WallPostcard {
  readonly instanceId: number;
  postcardId: number;
  image: string;
  title: string;
  x: number;
  y: number;
  rotation: PostcardRotation;
  width: number;
  height: number;
  zIndex?: number;
  isSelected?: boolean;
}

// 유니온 타입들
export type PostcardTheme =
  | '가을'
  | '사랑'
  | '도시'
  | '바다'
  | '봄'
  | '여름'
  | '겨울'
  | '기타';
export type PageType = 'main' | 'wall';
export type PostcardRotation = 0 | 90 | 180 | 270;
export type DragMode = 'move' | 'resize' | 'rotate';
export type ResizeHandle = 'se' | 'sw' | 'ne' | 'nw';

// 컴포넌트 Props 타입들
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

export interface PostcardCardProps extends BaseComponentProps {
  postcard: Postcard;
  onAddToWall?: (postcard: Postcard) => void;
  onRemove?: (id: number) => void;
  isSelected?: boolean;
  showPrice?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

export interface GalleryCanvasProps extends BaseComponentProps {
  wallPostcards: WallPostcard[];
  wallColor: string;
  onUpdateWallPostcards: (postcards: WallPostcard[]) => void;
  onRemovePostcard: (instanceId: number) => void;
  onRotatePostcard: (instanceId: number) => void;
  onSelectPostcard?: (instanceId: number) => void;
  selectedPostcardId?: number;
}

// 상태 관리 타입들
export interface DragState {
  activeItem: HTMLElement | null;
  currentX: number;
  currentY: number;
  initialX: number;
  initialY: number;
  xOffset: number;
  yOffset: number;
  isResizing: boolean;
  resizeHandle: ResizeHandle | null;
  initialWidth: number;
  initialHeight: number;
  mode: DragMode;
}

export interface PostcardContextState {
  wallPostcards: WallPostcard[];
  selectedPostcardId: number | null;
  isLoading: boolean;
  error: string | null;
}

export interface PostcardContextActions {
  addToWall: (postcard: Postcard) => void;
  updateWallPostcards: (postcards: WallPostcard[]) => void;
  removeWallPostcard: (instanceId: number) => void;
  selectPostcard: (instanceId: number | null) => void;
  clearError: () => void;
}

export type PostcardContextType = PostcardContextState & PostcardContextActions;

// 유틸리티 타입들
export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

// API 응답 타입들
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 설정 타입들
export interface AppConfig {
  postcard: {
    defaultSize: Size;
    minSize: Size;
    maxSize: Size;
    rotationStep: number;
  };
  wall: {
    defaultColor: string;
    minHeight: number;
  };
  ui: {
    zIndex: {
      default: number;
      dragging: number;
      selected: number;
    };
  };
}

// 이벤트 핸들러 타입들
export type MouseOrTouchEvent = React.MouseEvent | React.TouchEvent;
export type PostcardEventHandler<T = void> = (postcard: Postcard) => T;
export type WallPostcardEventHandler<T = void> = (
  wallPostcard: WallPostcard
) => T;
export type InstanceIdEventHandler<T = void> = (instanceId: number) => T;
