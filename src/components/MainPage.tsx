'use client';

import { Postcard } from '@/types';
import { postcardsData } from '@/data/postcards';

interface MainPageProps {
  onAddToWall: (id: number, image: string, title: string) => void;
}

export default function MainPage({ onAddToWall }: MainPageProps) {
  return (
    <>
      {/* 브랜드 배너 */}
      <section
        className="bg-cover bg-center h-96 relative flex items-center justify-center rounded-b-xl shadow-lg"
        style={{
          backgroundImage:
            "url('https://placehold.co/1920x400/292929/FFFFFF?text=Photographer+Brand+Image')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40 rounded-b-xl"></div>
        <div className="text-center relative z-10 p-6">
          <h2 className="text-5xl md:text-7xl font-light text-white leading-tight">
            순간을 기록하고,{' '}
            <span className="block font-bold mt-2">감정을 공유합니다.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mt-4">
            사진작가 [작가 이름]의 공식 엽서 스토어
          </p>
        </div>
      </section>

      {/* 상품 목록 (갤러리 형태) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h3 className="text-4xl font-bold text-gray-800 mb-8 border-b-2 pb-2 border-pink-500">
          Postcard Collection
        </h3>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5 p-5">
          {postcardsData.map(postcard => (
            <div
              key={postcard.id}
              className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <img
                src={postcard.image}
                alt={postcard.title}
                className="w-full h-auto object-cover rounded-lg mb-4"
                onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    'https://placehold.co/250x350/999999/FFFFFF?text=Image+Error';
                }}
              />
              <div className="text-center">
                <h4 className="text-xl font-semibold text-gray-900">
                  {postcard.title}
                </h4>
                <p className="text-sm text-gray-500">#{postcard.theme}</p>
                <p className="text-2xl font-bold text-pink-600 mt-2">
                  {postcard.price.toLocaleString()}원
                </p>
                <button
                  onClick={() =>
                    onAddToWall(postcard.id, postcard.image, postcard.title)
                  }
                  className="mt-3 w-full py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition duration-150 ease-in-out shadow-md"
                >
                  벽에 배치해보기
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

