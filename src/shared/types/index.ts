export interface Postcard {
  id: number;
  title: string;
  theme: string;
  price: number;
  image: string;
  description: string;
}

export interface WallPostcard {
  instanceId: number;
  postcardId: number;
  image: string;
  title: string;
  x: number;
  y: number;
  rotation: number;
  width?: number;
  height?: number;
}

export type PageType = 'main' | 'wall';

export interface DragState {
  activeItem: HTMLElement | null;
  currentX: number;
  currentY: number;
  initialX: number;
  initialY: number;
  xOffset: number;
  yOffset: number;
  isResizing: boolean;
  resizeHandle: string | null;
  initialWidth: number;
  initialHeight: number;
}
