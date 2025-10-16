export interface Postcard {
  id: number;
  title: string;
  theme: string;
  price: number;
  image: string;
}

export interface WallPostcard {
  instanceId: number;
  postcardId: number;
  image: string;
  title: string;
  x: number;
  y: number;
  rotation: number;
}

export type PageType = 'main' | 'wall';

