'use client';

import { postcardsData } from '@/shared/data/postcards';
import Image from 'next/image';

interface MainPageProps {
  onAddToWall: (id: number, image: string, title: string) => void;
}

export function MainPage({ onAddToWall }: MainPageProps) {
  return (
    <>
      {/* 브랜드 히어로 섹션 */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-[#faf8f5] to-[#f5f1eb] overflow-hidden">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-[#8b7355] rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-[#8b7355] rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-[#8b7355] rounded-full"></div>
        </div>

        <div className="text-center relative z-10 px-6 max-w-4xl mx-auto animate-fade-in-up">
          {/* 브랜드 로고 */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-[#2c2c2c] flex items-center justify-center bg-white shadow-lg overflow-hidden">
              <Image
                src="/img/img_logo.png"
                alt="Ga.Rang.B Logo"
                width={100}
                height={100}
                priority
              />
            </div>
            <h1 className="font-brand text-6xl md:text-7xl font-semibold text-[#2c2c2c] mb-4 tracking-tight">
              Ga.Rang.B
            </h1>
            <p className="font-brand-subtitle text-lg text-[#6b6b6b] mb-8">
              Stories in Pictures
            </p>
          </div>

          {/* 브랜드 메시지 */}
          <div className="space-y-6">
            <h2 className="font-brand text-3xl md:text-4xl font-medium text-[#2c2c2c] leading-relaxed">
              한 장의 사진 속에
              <br />
              <span className="text-[#8b7355]">이야기, 시간, 감정, 기억</span>을
              담아
            </h2>
            <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
              찍는 사진가 Ga.Rang.B의 포트폴리오와 엽서 컬렉션을 만나보세요.
              <br />각 순간의 소중한 이야기들이 담긴 사진들로 특별한 기억을
              만들어보세요.
            </p>
          </div>
        </div>
      </section>

      {/* 포트폴리오 갤러리 섹션 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h3 className="font-brand text-4xl md:text-5xl font-semibold text-[#2c2c2c] mb-6">
            엽서 컬렉션
          </h3>
          <p className="font-brand-subtitle text-sm text-[#6b6b6b] max-w-2xl mx-auto">
            각 사진 속에 담긴 이야기와 감정을 엽서로 만나보세요
          </p>
        </div>

        {/* 포트폴리오 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {postcardsData.map((postcard, index) => (
            <div
              key={postcard.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-[#f0f0f0] hover-lift animate-fade-in-up"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* 이미지 영역 */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={postcard.image}
                  alt={postcard.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      'https://placehold.co/250x350/999999/FFFFFF?text=Image+Error';
                  }}
                />
                {/* 호버 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-sm opacity-90">#{postcard.theme}</p>
                  </div>
                </div>
              </div>

              {/* 콘텐츠 영역 */}
              <div className="p-6">
                <h4 className="font-brand text-xl font-semibold text-[#2c2c2c] mb-2">
                  {postcard.title}
                </h4>
                <p className="text-sm text-[#6b6b6b] mb-4 line-clamp-2">
                  {postcard.description ||
                    '사진 속에 담긴 특별한 순간의 이야기'}
                </p>

                {/* 가격 및 버튼 */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-[#8b7355] text-lg">
                    {postcard.price.toLocaleString()}원
                  </span>
                </div>

                <button
                  onClick={() =>
                    onAddToWall(postcard.id, postcard.image, postcard.title)
                  }
                  className="w-full btn-primary group-hover:shadow-md"
                >
                  갤러리에 배치하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 브랜드 스토리 섹션 */}
      <section className="bg-[#f5f1eb] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h3 className="font-brand text-3xl md:text-4xl font-semibold text-[#2c2c2c] mb-8">
              Ga.Rang.B의 이야기
            </h3>
            <div className="space-y-6 text-[#6b6b6b] leading-relaxed">
              <p className="text-lg">
                &quot;가랑비처럼 은은하게 내려앉는 순간들을 사진으로
                담습니다.&quot;
              </p>
              <p>
                각 사진은 단순한 기록이 아닌, 그 순간의 감정과 이야기가 담긴
                작품입니다. 일상 속에서 발견하는 아름다운 순간들, 사람들의
                진실한 모습, 그리고 시간이 흘러도 잊히지 않을 특별한 기억들을
                카메라 렌즈를 통해 담아냅니다.
              </p>
              <p>
                엽서로 만나보는 이 사진들은 단순한 소통의 도구를 넘어, 받는
                이에게 따뜻한 위로와 기쁨을 전달하는 특별한 선물이 될 것입니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
