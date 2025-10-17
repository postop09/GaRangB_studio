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

export interface DragAndDropActions {
  onDragStart: (e: React.MouseEvent | React.TouchEvent) => void;
  onDrag: (e: MouseEvent | TouchEvent) => void;
  onDragEnd: () => void;
}
