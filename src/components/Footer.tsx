export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xl font-semibold mb-4">
          사진으로 세상을 이야기합니다.
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-pink-400 transition duration-150 ease-in-out"
          >
            <span className="font-bold">블로그</span>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-pink-400 transition duration-150 ease-in-out"
          >
            <span className="font-bold">인스타그램</span>
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          © 2024 My Photo Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

