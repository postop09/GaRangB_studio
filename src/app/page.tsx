'use client';

import { useState } from 'react';
import { PageType, WallPostcard } from '@/types';
import Header from '@/components/Header';
import MainPage from '@/components/MainPage';
import WallPage from '@/components/WallPage';
import Footer from '@/components/Footer';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>('main');
  const [wallPostcards, setWallPostcards] = useState<WallPostcard[]>([]);

  const navigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToWall = (id: number, image: string, title: string) => {
    const existing = wallPostcards.find(p => p.postcardId === id);

    const newPostcard: WallPostcard = {
      instanceId: Date.now() + Math.random(),
      postcardId: id,
      image: image,
      title: title,
      x: 50 + wallPostcards.length * 10,
      y: 50 + wallPostcards.length * 10,
      rotation: 0,
    };

    setWallPostcards([...wallPostcards, newPostcard]);
    navigate('wall');
  };

  const updateWallPostcards = (postcards: WallPostcard[]) => {
    setWallPostcards(postcards);
  };

  const removeWallPostcard = (instanceId: number) => {
    setWallPostcards(wallPostcards.filter(p => p.instanceId !== instanceId));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={navigate} />
      <main className="flex-grow">
        {currentPage === 'main' && <MainPage onAddToWall={addToWall} />}
        {currentPage === 'wall' && (
          <WallPage
            wallPostcards={wallPostcards}
            onUpdateWallPostcards={updateWallPostcards}
            onRemovePostcard={removeWallPostcard}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
