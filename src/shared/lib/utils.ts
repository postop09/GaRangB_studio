/**
 * 범위 내 값으로 제한하는 유틸리티 함수
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * 엽서의 기본 크기를 계산하는 함수
 */
export function getDefaultPostcardSize() {
  return {
    width: 150,
    height: 210,
  };
}

/**
 * 새로운 인스턴스 ID 생성
 */
export function generateInstanceId(): number {
  return Date.now() + Math.random();
}

/**
 * 엽서의 초기 위치를 계산하는 함수
 */
export function calculateInitialPosition(index: number) {
  return {
    x: 50 + index * 20,
    y: 50 + index * 20,
  };
}
