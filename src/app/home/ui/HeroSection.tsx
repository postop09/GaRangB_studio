import { BaseComponentProps } from '@/shared/types';

interface HeroSectionProps extends BaseComponentProps {
  title: string;
  subtitle: string;
  description: string;
}

function HeroSection({
  title,
  subtitle,
  description,
  'data-testid': testId,
}: HeroSectionProps) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f1eb] via-white to-[#f0f0f0] overflow-hidden"
      data-testid={testId}
    >
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-[#8b7355] rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-[#8b7355] rounded-full"></div>
        <div className="absolute bottom-32 left-1/3 w-16 h-16 border border-[#8b7355] rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border border-[#8b7355] rounded-full"></div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          {/* 서브타이틀 */}
          <p className="font-brand-subtitle text-sm text-[#8b7355] mb-4 tracking-wider uppercase">
            {subtitle}
          </p>

          {/* 메인 타이틀 */}
          <h1 className="font-brand text-5xl md:text-7xl lg:text-8xl font-bold text-[#2c2c2c] mb-8 leading-tight">
            {title}
          </h1>

          {/* 설명 */}
          <div className="font-brand-subtitle text-lg md:text-xl text-[#6b6b6b] leading-relaxed whitespace-pre-line">
            {description}
          </div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#8b7355] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#8b7355] rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
