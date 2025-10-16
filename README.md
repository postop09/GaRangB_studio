# 사진작가 포트폴리오 & 엽서샵

Next.js + TypeScript로 구축된 사진작가 포트폴리오 및 엽서샵 웹 애플리케이션입니다.

## 주요 기능

- **메인 갤러리**: 엽서 컬렉션을 갤러리 형태로 표시
- **벽 꾸미기**: 드래그 앤 드롭으로 엽서를 벽에 배치하고 꾸미기
- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **타입 안전성**: TypeScript로 구현된 타입 안전한 코드

## 기술 스택

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 프로젝트 구조

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # 글로벌 스타일
│   └── page.tsx        # 메인 페이지
├── components/         # React 컴포넌트
│   ├── Header.tsx      # 헤더 컴포넌트
│   ├── MainPage.tsx    # 메인 갤러리 페이지
│   ├── WallPage.tsx    # 벽 꾸미기 페이지
│   └── Footer.tsx      # 푸터 컴포넌트
├── data/              # 데이터 파일
│   └── postcards.ts   # 엽서 데이터
└── types/             # TypeScript 타입 정의
    └── index.ts       # 타입 인터페이스
```

## 주요 컴포넌트

### MainPage

- 엽서 컬렉션을 그리드 형태로 표시
- 각 엽서에 "벽에 배치해보기" 버튼 제공

### WallPage

- 드래그 앤 드롭으로 엽서 배치
- 엽서 회전 기능
- 벽 배경색 변경
- 엽서 제거 기능

## 개발 도구

- **Prettier**: 코드 자동 정렬
- **ESLint**: 코드 품질 검사
- **TypeScript**: 타입 체크

## 라이선스

MIT License
