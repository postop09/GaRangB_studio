// 새로운 중앙화된 타입 시스템 사용
export type {
  Postcard,
  WallPostcard,
  PostcardTheme,
  PostcardRotation,
  Position,
  Size,
} from '@/shared/types';

export interface PostcardManagementState {
  wallPostcards: import('@/shared/types').WallPostcard[];
  wallColor: string;
  selectedPostcardId: number | null;
  isLoading: boolean;
  error: string | null;
}

export interface PostcardManagementActions {
  addPostcardToWall: (postcard: import('@/shared/types').Postcard) => void;
  removePostcardFromWall: (instanceId: number) => void;
  updateWallPostcards: (
    postcards: import('@/shared/types').WallPostcard[]
  ) => void;
  rotatePostcard: (instanceId: number) => void;
  updateWallColor: (color: string) => void;
  resetWall: () => void;
  selectPostcard: (instanceId: number | null) => void;
  clearError: () => void;
}

export type PostcardManagementContextType = PostcardManagementState &
  PostcardManagementActions;
