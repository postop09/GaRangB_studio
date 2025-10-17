'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Postcard, WallPostcard } from '@/types';
import { postcardsData } from '@/data/postcards';

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
  isResizing: boolean;
  resizeHandle: string | null;
  initialWidth: number;
  initialHeight: number;
}

export default function WallPage({
  wallPostcards,
  onUpdateWallPostcards,
  onRemovePostcard,
}: WallPageProps) {
  const [wallColor, setWallColor] = useState('#fff');
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
  });

  const updateWallColor = (color: string) => {
    setWallColor(color);
    console.log('Wall color updated to:', color); // 디버깅용
  };

  const resetWall = () => {
    onUpdateWallPostcards([]);
    setWallColor('#faf8f5');
  };

  const removeWallPostcard = (instanceId: number) => {
    onRemovePostcard(instanceId);
  };

  const addPostcardToGallery = (postcard: Postcard) => {
    const newPostcard: WallPostcard = {
      instanceId: Date.now() + Math.random(),
      postcardId: postcard.id,
      image: postcard.image,
      title: postcard.title,
      x: 50 + wallPostcards.length * 20,
      y: 50 + wallPostcards.length * 20,
      rotation: 0,
      width: 150,
      height: 210,
    };
    onUpdateWallPostcards([...wallPostcards, newPostcard]);
  };

  const rotateWallPostcard = (instanceId: number) => {
    const updatedPostcards = wallPostcards.map(postcard => {
      if (postcard.instanceId === instanceId) {
        return {
          ...postcard,
          rotation: (postcard.rotation + 90) % 360,
        };
      }
      return postcard;
    });
    onUpdateWallPostcards(updatedPostcards);
  };

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
      dragState.current.resizeHandle = 'se'; // 우하단 핸들만 사용
      item.style.zIndex = '100';
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
    item.style.zIndex = '100';
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
      dragState.current.activeItem.style.zIndex = '10';
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
        80,
        Math.min(300, dragState.current.initialWidth + deltaX)
      );
      newHeight = newWidth / aspectRatio;

      // 최소/최대 높이 제한
      newHeight = Math.max(112, Math.min(420, newHeight));
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
        <button onClick={resetWall} className="btn-primary">
          갤러리 초기화
        </button>
      </div>

      {/* 엽서 선택 섹션 */}
      <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-[#e8ddd4] hover-lift">
        <h4 className="font-brand text-xl font-semibold text-[#2c2c2c] mb-4">
          엽서 선택하기
        </h4>
        <p className="text-sm text-[#6b6b6b] mb-6">
          아래 엽서를 클릭하여 갤러리에 추가할 수 있습니다
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {postcardsData.map(postcard => (
            <div
              key={postcard.id}
              className="group cursor-pointer"
              onClick={() => addPostcardToGallery(postcard)}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg border-2 border-[#e8ddd4] hover:border-[#8b7355] transition-all duration-300 hover:shadow-lg">
                <Image
                  src={postcard.image}
                  alt={postcard.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/150x200/999999/FFFFFF?text=${postcard.title}`;
                  }}
                />
                {/* 호버 오버레이 */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 text-[#8b7355] px-3 py-1 rounded-full text-xs font-medium">
                      추가하기
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#6b6b6b] mt-2 text-center truncate">
                {postcard.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 갤러리 캔버스 */}
      <div
        ref={canvasRef}
        id="wall-canvas"
        className={`wall-canvas rounded-2xl shadow-inner min-h-[600px] border border-[#e8ddd4] relative overflow-hidden ${
          wallColor === '#fff' ? 'default-bg' : ''
        }`}
        style={{
          backgroundColor: wallColor === '#fff' ? undefined : wallColor,
        }}
      >
        {wallPostcards.map(postcard => {
          const postcardWidth = postcard.width || 150;
          const postcardHeight = postcard.height || 210;

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
              className="draggable-postcard absolute p-2 bg-white shadow-lg rounded-xl cursor-grab touch-none hover:shadow-xl border border-[#f0f0f0] hover-lift"
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
                className="absolute top-1 right-1 w-6 h-6 bg-[#8b7355] text-white rounded-full flex items-center justify-center text-xs font-medium opacity-90 hover:opacity-100 hover:bg-[#2c2c2c] transition-all duration-200 shadow-md"
              >
                ×
              </button>
              {/* 회전 핸들 */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  rotateWallPostcard(postcard.instanceId);
                }}
                className="absolute top-1 left-1 w-6 h-6 bg-[#6b6b6b] text-white rounded-full flex items-center justify-center text-xs font-medium opacity-90 hover:opacity-100 hover:bg-[#8b7355] transition-all duration-200 shadow-md"
              >
                ↻
              </button>

              {/* 크기 조절 핸들 (우하단만) */}
              <div
                className="absolute bottom-1 right-1 w-4 h-4 bg-[#8b7355] border-2 border-white rounded-full cursor-se-resize resize-handle opacity-80 hover:opacity-100 transition-opacity duration-200"
                data-handle="se"
                onMouseDown={dragStart}
                onTouchStart={dragStart}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
