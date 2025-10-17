'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import type {
  PostcardContextType,
  WallPostcard,
  Postcard,
  PostcardContextState,
  PostcardContextActions,
} from '@/shared/types';
import {
  createWallPostcard,
  findNonOverlappingPosition,
  storage,
} from '@/shared/lib/utils';
import { APP_CONFIG } from '@/shared/config/constants';

const PostcardContext = createContext<PostcardContextType | undefined>(
  undefined
);

// 커스텀 훅
export function usePostcardContext(): PostcardContextType {
  const context = useContext(PostcardContext);
  if (context === undefined) {
    throw new Error(
      'usePostcardContext must be used within a PostcardProvider'
    );
  }
  return context;
}

// 상태 관리용 커스텀 훅
function usePostcardState(): PostcardContextState & PostcardContextActions {
  const [state, setState] = useState<PostcardContextState>({
    wallPostcards: [],
    selectedPostcardId: null,
    isLoading: false,
    error: null,
  });

  // 로컬 스토리지에서 상태 복원
  useEffect(() => {
    const savedPostcards = storage.get<WallPostcard[]>('wallPostcards', []);
    setState(prev => ({
      ...prev,
      wallPostcards: savedPostcards,
    }));
  }, []);

  // 상태 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    if (state.wallPostcards.length > 0) {
      storage.set('wallPostcards', state.wallPostcards);
    }
  }, [state.wallPostcards]);

  // 액션들
  const addToWall = useCallback((postcard: Postcard) => {
    setState(prev => {
      try {
        // 기존 포스트카드와 겹치지 않는 위치 찾기
        const canvasSize = { width: 800, height: 600 }; // 실제 캔버스 크기는 컴포넌트에서 관리
        const newWallPostcard = createWallPostcard(
          postcard,
          undefined,
          prev.wallPostcards.length
        );

        const nonOverlappingPosition = findNonOverlappingPosition(
          newWallPostcard,
          prev.wallPostcards,
          canvasSize
        );

        const finalWallPostcard = {
          ...newWallPostcard,
          ...nonOverlappingPosition,
        };

        return {
          ...prev,
          wallPostcards: [...prev.wallPostcards, finalWallPostcard],
          error: null,
        };
      } catch (error) {
        return {
          ...prev,
          error:
            error instanceof Error
              ? error.message
              : '포스트카드 추가 중 오류가 발생했습니다.',
        };
      }
    });
  }, []);

  const updateWallPostcards = useCallback((postcards: WallPostcard[]) => {
    setState(prev => ({
      ...prev,
      wallPostcards: postcards,
      selectedPostcardId: null, // 업데이트 시 선택 해제
      error: null,
    }));
  }, []);

  const removeWallPostcard = useCallback((instanceId: number) => {
    setState(prev => ({
      ...prev,
      wallPostcards: prev.wallPostcards.filter(
        p => p.instanceId !== instanceId
      ),
      selectedPostcardId:
        prev.selectedPostcardId === instanceId ? null : prev.selectedPostcardId,
      error: null,
    }));
  }, []);

  const selectPostcard = useCallback((instanceId: number | null) => {
    setState(prev => ({
      ...prev,
      selectedPostcardId: instanceId,
      wallPostcards: prev.wallPostcards.map(postcard => ({
        ...postcard,
        isSelected: postcard.instanceId === instanceId,
        zIndex:
          postcard.instanceId === instanceId
            ? APP_CONFIG.ui.zIndex.selected
            : APP_CONFIG.ui.zIndex.default,
      })),
    }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
    }));
  }, []);

  return {
    ...state,
    addToWall,
    updateWallPostcards,
    removeWallPostcard,
    selectPostcard,
    clearError,
  };
}

interface PostcardProviderProps {
  children: ReactNode;
}

export function PostcardProvider({ children }: PostcardProviderProps) {
  const postcardState = usePostcardState();

  return (
    <PostcardContext.Provider value={postcardState}>
      {children}
    </PostcardContext.Provider>
  );
}
