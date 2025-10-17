'use client';

import { memo } from 'react';
import Image from 'next/image';
import type { BaseComponentProps } from '../types';

interface HeroSectionProps extends BaseComponentProps {
  title: string;
  subtitle?: string;
  description: string;
  logoUrl?: string;
  logoAlt?: string;
}

export const HeroSection = memo<HeroSectionProps>(
  ({
    title,
    subtitle,
    description,
    logoUrl = '/img/img_logo.png',
    logoAlt = 'Ga.Rang.B Logo',
    className,
    'data-testid': testId,
  }) => {
    return (
      <section
        className={`relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-[#faf8f5] to-[#f5f1eb] overflow-hidden ${
          className || ''
        }`}
        data-testid={testId}
        role="banner"
        aria-label="메인 히어로 섹션"
      >
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div className="absolute top-20 left-20 w-32 h-32 border border-[#8b7355] rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-[#8b7355] rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-[#8b7355] rounded-full"></div>
        </div>

        <div className="text-center relative z-10 px-6 max-w-4xl mx-auto animate-fade-in-up">
          {/* 브랜드 로고 */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-[#2c2c2c] flex items-center justify-center bg-white shadow-lg overflow-hidden">
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={100}
                height={100}
                priority
                className="object-cover"
              />
            </div>
            <h1 className="font-brand text-6xl md:text-7xl font-semibold text-[#2c2c2c] mb-4 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="font-brand-subtitle text-lg text-[#6b6b6b] mb-8">
                {subtitle}
              </p>
            )}
          </div>

          {/* 브랜드 메시지 */}
          <div className="space-y-6">
            <h2 className="font-brand text-3xl md:text-4xl font-medium text-[#2c2c2c] leading-relaxed">
              {description.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < description.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
              찍는 사진가 Ga.Rang.B의 포트폴리오와 엽서 컬렉션을 만나보세요.
              <br />각 순간의 소중한 이야기들이 담긴 사진들로 특별한 기억을
              만들어보세요.
            </p>
          </div>
        </div>
      </section>
    );
  }
);

HeroSection.displayName = 'HeroSection';
