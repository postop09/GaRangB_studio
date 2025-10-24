import React, { useRef, useState } from 'react';

interface ImageUploadSectionProps {
  onImageUpload: (file: File) => void;
  isUploading?: boolean;
}

const ImageUploadSection = ({
  onImageUpload,
  isUploading = false,
}: ImageUploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file: File) => {
    // 이미지 파일만 허용
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    // 파일 크기 제한 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    onImageUpload(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-[#e8ddd4] hover-lift">
      <div className="mb-6">
        <h2 className="font-brand text-xl font-semibold text-[#2c2c2c] mb-2">
          이미지 업로드
        </h2>
        <p className="text-sm text-[#6b6b6b]">
          PC에서 이미지를 업로드하여 갤러리에 추가할 수 있습니다
        </p>
      </div>

      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
          ${
            dragActive
              ? 'border-[#8b7355] bg-[#f8f6f3]'
              : 'border-[#e8ddd4] hover:border-[#8b7355] hover:bg-[#f8f6f3]'
          }
          ${isUploading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isUploading}
        />

        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-[#f0f0f0] rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#8b7355]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>

          <div>
            <p className="text-lg font-medium text-[#2c2c2c] mb-2">
              {isUploading ? '업로드 중...' : '이미지를 업로드하세요'}
            </p>
            <p className="text-sm text-[#6b6b6b]">
              클릭하거나 드래그하여 이미지를 업로드하세요
            </p>
            <p className="text-xs text-[#999] mt-2">
              지원 형식: JPG, PNG, GIF, WebP (최대 5MB)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageUploadSection;
