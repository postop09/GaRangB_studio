'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { WallPostcard } from '@/shared/types';
import {
  generateInstanceId,
  calculateInitialPosition,
  getDefaultPostcardSize,
} from '@/shared/lib/utils';

interface PostcardContextType {
  wallPostcards: WallPostcard[];
  addToWall: (id: number, image: string, title: string) => void;
  updateWallPostcards: (postcards: WallPostcard[]) => void;
  removeWallPostcard: (instanceId: number) => void;
}

const PostcardContext = createContext<PostcardContextType | undefined>(
  undefined
);

export function usePostcardContext() {
  const context = useContext(PostcardContext);
  if (context === undefined) {
    throw new Error(
      'usePostcardContext must be used within a PostcardProvider'
    );
  }
  return context;
}

interface PostcardProviderProps {
  children: ReactNode;
}

export function PostcardProvider({ children }: PostcardProviderProps) {
  const [wallPostcards, setWallPostcards] = useState<WallPostcard[]>([]);

  const addToWall = (id: number, image: string, title: string) => {
    const { width, height } = getDefaultPostcardSize();
    const { x, y } = calculateInitialPosition(wallPostcards.length);

    const newPostcard: WallPostcard = {
      instanceId: generateInstanceId(),
      postcardId: id,
      image: image,
      title: title,
      x,
      y,
      rotation: 0,
      width,
      height,
    };

    setWallPostcards([...wallPostcards, newPostcard]);
  };

  const updateWallPostcards = (postcards: WallPostcard[]) => {
    setWallPostcards(postcards);
  };

  const removeWallPostcard = (instanceId: number) => {
    setWallPostcards(wallPostcards.filter(p => p.instanceId !== instanceId));
  };

  const value = {
    wallPostcards,
    addToWall,
    updateWallPostcards,
    removeWallPostcard,
  };

  return (
    <PostcardContext.Provider value={value}>
      {children}
    </PostcardContext.Provider>
  );
}
