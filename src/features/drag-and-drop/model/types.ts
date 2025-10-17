// 새로운 중앙화된 타입 시스템 사용
export type {
  DragState,
  DragMode,
  ResizeHandle,
  Position,
  Size,
  Bounds,
} from '@/shared/types';

export interface DragAndDropActions {
  onDragStart: (e: React.MouseEvent | React.TouchEvent) => void;
  onDrag: (e: MouseEvent | TouchEvent) => void;
  onDragEnd: () => void;
}
