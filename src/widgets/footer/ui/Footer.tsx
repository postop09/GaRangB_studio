import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-[#2c2c2c] text-white mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 브랜드 정보 */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="rounded-full border-2 border-white flex items-center justify-center overflow-hidden">
                <Image
                  src="/img/img_logo.png"
                  alt="Ga.Rang.B Logo"
                  width={32}
                  height={32}
                />
              </div>
              <div>
                <h3 className="font-brand text-xl font-semibold text-white">
                  Ga.Rang.B
                </h3>
                <p className="font-brand-subtitle text-xs text-gray-400 -mt-1">
                  Stories in Pictures
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              한 장의 사진 속에 이야기, 시간, 감정, 기억을 담아 찍는 사진가
            </p>
          </div>

          {/* 연락처 */}
          <div className="text-center md:text-left">
            <h4 className="font-medium text-white mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📧 garangb.photo@gmail.com</p>
              <p>📱 +82 10-1234-5678</p>
              <p>📍 Seoul, South Korea</p>
            </div>
          </div>

          {/* 소셜 미디어 */}
          <div className="text-center md:text-left">
            <h4 className="font-medium text-white mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#8b7355] rounded-full flex items-center justify-center hover:bg-white hover:text-[#8b7355] transition-all duration-300"
              >
                <span className="text-sm font-medium">IG</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#8b7355] rounded-full flex items-center justify-center hover:bg-white hover:text-[#8b7355] transition-all duration-300"
              >
                <span className="text-sm font-medium">FB</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#8b7355] rounded-full flex items-center justify-center hover:bg-white hover:text-[#8b7355] transition-all duration-300"
              >
                <span className="text-sm font-medium">YT</span>
              </a>
            </div>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2024 Ga.Rang.B Photography. All rights reserved. | Made with ❤️
            for storytelling
          </p>
        </div>
      </div>
    </footer>
  );
}
