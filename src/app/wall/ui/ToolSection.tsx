import React from 'react';

interface ToolSectionProps {
  wallColor: string;
  onUpdateWallColor: (color: string) => void;
  onResetWall: () => void;
}

const ToolSection = ({
  wallColor,
  onUpdateWallColor,
  onResetWall,
}: ToolSectionProps) => {
  return (
    <section className="flex flex-col md:flex-row gap-6 mb-8 p-6 bg-white rounded-2xl shadow-sm border border-[#e8ddd4] hover-lift">
      <h2 className="hidden">갤러리 설정</h2>
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
            onChange={e => onUpdateWallColor(e.target.value)}
            className="w-12 h-12 rounded-full border-2 border-[#e8ddd4] cursor-pointer hover:border-[#8b7355] transition-colors"
            aria-label="갤러리 배경색 선택"
          />
          <span className="text-xs text-[#6b6b6b]">색상 선택</span>
        </div>
      </div>

      {/* 초기화 버튼 */}
      <button
        onClick={onResetWall}
        className="btn-primary"
        aria-label="갤러리 초기화"
        type="button"
      >
        갤러리 초기화
      </button>
    </section>
  );
};

export default ToolSection;
