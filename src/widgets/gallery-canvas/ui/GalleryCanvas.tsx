'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { WallPostcard, DragState, Size } from '@/shared/types';
import { APP_CONFIG } from '@/shared/config/constants';
import {
  clampPositionToBounds,
  clampSizeToBounds,
  getFallbackImageUrl,
  getNextRotation,
  cn,
} from '@/shared/lib/utils';

interface GalleryCanvasProps {
  wallPostcards: WallPostcard[];
  wallColor: string;
  onUpdateWallPostcards: (postcards: WallPostcard[]) => void;
  onRemovePostcard: (instanceId: number) => void;
  onRotatePostcard: (instanceId: number) => void;
  onSelectPostcard?: (instanceId: number) => void;
  selectedPostcardId?: number;
  className?: string;
  'data-testid'?: string;
}

export function GalleryCanvas({
  wallPostcards,
  wallColor,
  onUpdateWallPostcards,
  onRemovePostcard,
  onRotatePostcard,
  onSelectPostcard,
  selectedPostcardId,
  className,
  'data-testid': testId,
}: GalleryCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<DragState>({
    activeItem: null,
    currentX: 0,
    currentY: 0,
    initialX: 0,
    initialY: 0,
    xOffset: 0,
    yOffset: 0,
    isResizing: false,
    resizeHandle: null,
    initialWidth: 0,
    initialHeight: 0,
    mode: 'move',
  });

  const dragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const target = e.target as HTMLElement;

    // 크기 조절 핸들 클릭 확인
    if (target.classList.contains('resize-handle')) {
      e.preventDefault();
      e.stopPropagation();

      const item = target.closest('.draggable-postcard') as HTMLElement;
      if (!item || !canvasRef.current) return;

      dragState.current.activeItem = item;
      dragState.current.isResizing = true;
      dragState.current.resizeHandle = 'se';
      dragState.current.mode = 'resize';
      item.style.zIndex = APP_CONFIG.ui.zIndex.dragging.toString();
      item.classList.add('dragging');

      // 초기 크기 저장
      const currentWidth = parseInt(item.style.width, 10);
      const currentHeight = parseInt(item.style.height, 10);
      dragState.current.initialWidth = currentWidth;
      dragState.current.initialHeight = currentHeight;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      dragState.current.initialX = clientX - canvasRect.left;
      dragState.current.initialY = clientY - canvasRect.top;

      return;
    }

    // 일반 드래그 시작
    const item = target.closest('.draggable-postcard') as HTMLElement;
    if (!item || !canvasRef.current) return;

    dragState.current.activeItem = item;
    dragState.current.isResizing = false;
    dragState.current.mode = 'move';
    item.style.zIndex = APP_CONFIG.ui.zIndex.dragging.toString();
    item.classList.add('dragging');

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    // 캔버스 내에서의 클릭 위치 계산
    const canvasX = clientX - canvasRect.left;
    const canvasY = clientY - canvasRect.top;

    // 아이템의 현재 위치
    const itemX = parseInt(item.style.left, 10);
    const itemY = parseInt(item.style.top, 10);

    // 클릭한 지점과 아이템 좌상단 간의 offset 계산
    dragState.current.xOffset = canvasX - itemX;
    dragState.current.yOffset = canvasY - itemY;
  };

  const dragEnd = useCallback(() => {
    if (dragState.current.activeItem) {
      dragState.current.activeItem.style.zIndex =
        APP_CONFIG.ui.zIndex.default.toString();
      dragState.current.activeItem.classList.remove('dragging');

      const instanceId = parseInt(
        dragState.current.activeItem.dataset.instanceId || '0',
        10
      );
      const index = wallPostcards.findIndex(p => p.instanceId === instanceId);

      if (index > -1) {
        const updatedPostcards = [...wallPostcards];

        if (dragState.current.isResizing) {
          // 크기 조절 완료
          updatedPostcards[index].width = parseInt(
            dragState.current.activeItem!.style.width,
            10
          );
          updatedPostcards[index].height = parseInt(
            dragState.current.activeItem!.style.height,
            10
          );
        } else {
          // 일반 드래그 완료
          updatedPostcards[index].x = parseInt(
            dragState.current.activeItem!.style.left,
            10
          );
          updatedPostcards[index].y = parseInt(
            dragState.current.activeItem!.style.top,
            10
          );
        }

        onUpdateWallPostcards(updatedPostcards);
      }
    }

    // 상태 초기화
    dragState.current.activeItem = null;
    dragState.current.isResizing = false;
    dragState.current.resizeHandle = null;
  }, [wallPostcards, onUpdateWallPostcards]);

  const drag = useCallback((e: MouseEvent | TouchEvent) => {
    if (!dragState.current.activeItem || !canvasRef.current) return;

    e.preventDefault();

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    // 캔버스 내에서의 마우스 위치 계산
    const canvasX = clientX - canvasRect.left;
    const canvasY = clientY - canvasRect.top;

    if (dragState.current.isResizing && dragState.current.resizeHandle) {
      // 크기 조절 로직
      const deltaX = canvasX - dragState.current.initialX;

      let newWidth = dragState.current.initialWidth;
      let newHeight = dragState.current.initialHeight;

      // 우하단 핸들만 사용하고 비율 유지
      const aspectRatio =
        dragState.current.initialWidth / dragState.current.initialHeight;

      // X축 변화량을 기준으로 비율에 맞춰 크기 계산
      newWidth = Math.max(
        APP_CONFIG.postcard.minSize.width,
        Math.min(
          APP_CONFIG.postcard.maxSize.width,
          dragState.current.initialWidth + deltaX
        )
      );
      newHeight = newWidth / aspectRatio;

      // 최소/최대 높이 제한
      newHeight = Math.max(
        APP_CONFIG.postcard.minSize.height,
        Math.min(APP_CONFIG.postcard.maxSize.height, newHeight)
      );
      // 높이 제한에 맞춰 너비 재계산
      newWidth = newHeight * aspectRatio;

      dragState.current.activeItem.style.width = `${newWidth}px`;
      dragState.current.activeItem.style.height = `${newHeight}px`;
    } else {
      // 일반 드래그 로직
      // 새로운 아이템 위치 계산 (offset을 빼서 클릭한 지점이 그대로 유지되도록)
      let newX = canvasX - dragState.current.xOffset;
      let newY = canvasY - dragState.current.yOffset;

      // 캔버스 경계 내로 제한
      const itemWidth = dragState.current.activeItem.offsetWidth;
      const itemHeight = dragState.current.activeItem.offsetHeight;

      newX = Math.max(
        0,
        Math.min(newX, canvasRef.current.offsetWidth - itemWidth)
      );
      newY = Math.max(
        0,
        Math.min(newY, canvasRef.current.offsetHeight - itemHeight)
      );

      dragState.current.activeItem.style.left = `${newX}px`;
      dragState.current.activeItem.style.top = `${newY}px`;
    }
  }, []);

  // 드래그 이벤트 핸들러 관리
  useEffect(() => {
    const handleMouseUp = () => dragEnd();
    const handleMouseMove = (e: MouseEvent) => drag(e);
    const handleTouchEnd = () => dragEnd();
    const handleTouchMove = (e: TouchEvent) => drag(e);

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [dragEnd, drag]);

  return (
    <div
      ref={canvasRef}
      id="wall-canvas"
      className={cn(
        'wall-canvas rounded-2xl shadow-inner border border-[#e8ddd4] relative overflow-hidden',
        className
      )}
      style={{
        backgroundColor:
          wallColor === APP_CONFIG.wall.defaultColor ? undefined : wallColor,
        minHeight: `${APP_CONFIG.wall.minHeight}px`,
      }}
      data-testid={testId}
      role="application"
      aria-label="포스트카드 갤러리 캔버스"
      tabIndex={0}
    >
      {wallPostcards.map(postcard => {
        const postcardWidth =
          postcard.width || APP_CONFIG.postcard.defaultSize.width;
        const postcardHeight =
          postcard.height || APP_CONFIG.postcard.defaultSize.height;

        const initialX = Math.min(
          Math.max(postcard.x, 0),
          (canvasRef.current?.offsetWidth || 800) - postcardWidth
        );
        const initialY = Math.min(
          Math.max(postcard.y, 0),
          (canvasRef.current?.offsetHeight || 500) - postcardHeight
        );

        const isSelected = selectedPostcardId === postcard.instanceId;

        return (
          <div
            key={postcard.instanceId}
            className={cn(
              'draggable-postcard absolute p-2 bg-white shadow-lg rounded-xl cursor-grab touch-none hover:shadow-xl border border-[#f0f0f0] hover-lift',
              isSelected && 'ring-2 ring-[#8b7355] shadow-xl'
            )}
            style={{
              width: `${postcardWidth}px`,
              height: `${postcardHeight}px`,
              left: `${initialX}px`,
              top: `${initialY}px`,
              transform: `rotate(${postcard.rotation}deg)`,
              zIndex: postcard.zIndex || APP_CONFIG.ui.zIndex.default,
            }}
            data-instance-id={postcard.instanceId}
            onMouseDown={dragStart}
            onTouchStart={dragStart}
            onClick={() => onSelectPostcard?.(postcard.instanceId)}
            role="img"
            aria-label={`포스트카드: ${postcard.title}`}
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectPostcard?.(postcard.instanceId);
              }
            }}
          >
            <Image
              src={postcard.image}
              alt={postcard.title}
              fill
              className="object-cover rounded-md select-none"
              draggable={false}
              style={{ userSelect: 'none' }}
              onError={e => {
                const target = e.target as HTMLImageElement;
                target.src = getFallbackImageUrl(postcard.title, {
                  width: 150,
                  height: 210,
                });
              }}
            />
            {/* 닫기 버튼 */}
            <button
              onClick={e => {
                e.stopPropagation();
                onRemovePostcard(postcard.instanceId);
              }}
              className="absolute top-1 right-1 w-6 h-6 bg-[#8b7355] text-white rounded-full flex items-center justify-center text-xs font-medium opacity-90 hover:opacity-100 hover:bg-[#2c2c2c] transition-all duration-200 shadow-md"
              aria-label={`${postcard.title} 제거`}
              type="button"
            >
              ×
            </button>
            {/* 회전 핸들 */}
            <button
              onClick={e => {
                e.stopPropagation();
                onRotatePostcard(postcard.instanceId);
              }}
              className="absolute top-1 left-1 w-6 h-6 bg-[#6b6b6b] text-white rounded-full flex items-center justify-center text-xs font-medium opacity-90 hover:opacity-100 hover:bg-[#8b7355] transition-all duration-200 shadow-md"
              aria-label={`${postcard.title} 회전`}
              type="button"
            >
              ↻
            </button>

            {/* 크기 조절 핸들 (우하단만) */}
            <div
              className="absolute bottom-1 right-1 w-4 h-4 bg-[#8b7355] border-2 border-white rounded-full cursor-se-resize resize-handle opacity-80 hover:opacity-100 transition-opacity duration-200"
              data-handle="se"
              onMouseDown={dragStart}
              onTouchStart={dragStart}
              role="button"
              aria-label={`${postcard.title} 크기 조절`}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  // 키보드로 크기 조절하는 경우의 로직
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
