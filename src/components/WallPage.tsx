'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { WallPostcard } from '@/types';

interface WallPageProps {
  wallPostcards: WallPostcard[];
  onUpdateWallPostcards: (postcards: WallPostcard[]) => void;
  onRemovePostcard: (instanceId: number) => void;
}

interface DragState {
  activeItem: HTMLElement | null;
  currentX: number;
  currentY: number;
  initialX: number;
  initialY: number;
  xOffset: number;
  yOffset: number;
}

export default function WallPage({
  wallPostcards,
  onUpdateWallPostcards,
  onRemovePostcard,
}: WallPageProps) {
  const [wallColor, setWallColor] = useState('#f0f0f0');
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<DragState>({
    activeItem: null,
    currentX: 0,
    currentY: 0,
    initialX: 0,
    initialY: 0,
    xOffset: 0,
    yOffset: 0,
  });

  const updateWallColor = (color: string) => {
    setWallColor(color);
  };

  const resetWall = () => {
    onUpdateWallPostcards([]);
    setWallColor('#f0f0f0');
  };

  const removeWallPostcard = (instanceId: number) => {
    onRemovePostcard(instanceId);
  };

  const rotateWallPostcard = (instanceId: number) => {
    const updatedPostcards = wallPostcards.map(postcard => {
      if (postcard.instanceId === instanceId) {
        return {
          ...postcard,
          rotation: (postcard.rotation + 15) % 360,
        };
      }
      return postcard;
    });
    onUpdateWallPostcards(updatedPostcards);
  };

  const dragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const item = (e.target as HTMLElement).closest(
      '.draggable-postcard'
    ) as HTMLElement;
    if (!item || !canvasRef.current) return;

    dragState.current.activeItem = item;
    item.style.zIndex = '100';

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
      dragState.current.activeItem.style.zIndex = '10';

      const instanceId = parseInt(
        dragState.current.activeItem.dataset.instanceId || '0',
        10
      );
      const index = wallPostcards.findIndex(p => p.instanceId === instanceId);

      if (index > -1) {
        const updatedPostcards = [...wallPostcards];
        updatedPostcards[index].x = parseInt(
          dragState.current.activeItem!.style.left,
          10
        );
        updatedPostcards[index].y = parseInt(
          dragState.current.activeItem!.style.top,
          10
        );
        onUpdateWallPostcards(updatedPostcards);
      }
    }
    dragState.current.activeItem = null;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      {/* 페이지 헤더 */}
      <div className="text-center mb-12 animate-fade-in-up">
        <h3 className="font-brand text-4xl font-semibold text-[#2c2c2c] mb-4">
          나만의 갤러리 꾸미기
        </h3>
        <p className="font-brand-subtitle text-sm text-[#6b6b6b] max-w-2xl mx-auto">
          사진 속 이야기들을 담은 엽서들로 나만의 감성적인 공간을 만들어보세요
        </p>
      </div>

      {/* 설정 및 도구 영역 */}
      <div className="flex flex-col md:flex-row gap-6 mb-8 p-6 bg-white rounded-2xl shadow-sm border border-[#e8ddd4] hover-lift">
        {/* 배경색 설정 */}
        <div className="flex items-center space-x-4">
          <label
            htmlFor="wall-color"
            className="font-medium text-[#2c2c2c] text-sm"
          >
            갤러리 배경:
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              id="wall-color"
              value={wallColor}
              onChange={e => updateWallColor(e.target.value)}
              className="w-12 h-12 rounded-full border-2 border-[#e8ddd4] cursor-pointer hover:border-[#8b7355] transition-colors"
            />
            <span className="text-xs text-[#6b6b6b]">색상 선택</span>
          </div>
        </div>

        {/* 초기화 버튼 */}
        <button
          onClick={resetWall}
          className="py-3 px-6 bg-[#f5f1eb] text-[#8b7355] rounded-full hover:bg-[#e8ddd4] hover:text-[#2c2c2c] transition-all duration-300 ease-in-out font-medium text-sm border border-[#e8ddd4] hover:border-[#8b7355]"
        >
          갤러리 초기화
        </button>
      </div>

      {/* 갤러리 캔버스 */}
      <div
        ref={canvasRef}
        id="wall-canvas"
        className="rounded-2xl shadow-inner min-h-[600px] border border-[#e8ddd4] relative overflow-hidden bg-gradient-to-br from-[#faf8f5] to-[#f5f1eb]"
        style={{ backgroundColor: wallColor }}
      >
        {wallPostcards.map(postcard => {
          const postcardWidth = 150;
          const postcardHeight = 210;

          const initialX = Math.min(
            Math.max(postcard.x, 0),
            (canvasRef.current?.offsetWidth || 800) - postcardWidth
          );
          const initialY = Math.min(
            Math.max(postcard.y, 0),
            (canvasRef.current?.offsetHeight || 500) - postcardHeight
          );

          return (
            <div
              key={postcard.instanceId}
              className="draggable-postcard absolute transition-all duration-300 ease-in-out p-2 bg-white shadow-lg rounded-xl cursor-grab touch-none hover:shadow-xl border border-[#f0f0f0] hover-lift"
              style={{
                width: `${postcardWidth}px`,
                height: `${postcardHeight}px`,
                left: `${initialX}px`,
                top: `${initialY}px`,
                transform: `rotate(${postcard.rotation}deg)`,
                zIndex: 10,
              }}
              data-instance-id={postcard.instanceId}
              onMouseDown={dragStart}
              onTouchStart={dragStart}
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
                  target.src = `https://placehold.co/150x210/999999/FFFFFF?text=${postcard.title}`;
                }}
              />
              {/* 닫기 버튼 */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  removeWallPostcard(postcard.instanceId);
                }}
                className="absolute -top-2 -right-2 w-7 h-7 bg-[#8b7355] text-white rounded-full flex items-center justify-center text-xs font-medium opacity-90 hover:opacity-100 hover:bg-[#2c2c2c] transition-all duration-200 shadow-md"
              >
                ×
              </button>
              {/* 회전 핸들 */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  rotateWallPostcard(postcard.instanceId);
                }}
                className="absolute -bottom-2 -left-2 w-7 h-7 bg-[#6b6b6b] text-white rounded-full flex items-center justify-center text-xs font-medium opacity-90 hover:opacity-100 hover:bg-[#8b7355] transition-all duration-200 shadow-md"
              >
                ↻
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
