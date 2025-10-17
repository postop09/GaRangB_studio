import { Postcard, WallPostcard } from '@/shared/types';

export interface PostcardManagementState {
  wallPostcards: WallPostcard[];
  wallColor: string;
}

export interface PostcardManagementActions {
  addPostcardToWall: (postcard: Postcard) => void;
  removePostcardFromWall: (instanceId: number) => void;
  updateWallPostcards: (postcards: WallPostcard[]) => void;
  rotatePostcard: (instanceId: number) => void;
  updateWallColor: (color: string) => void;
  resetWall: () => void;
}
