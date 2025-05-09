import { useEffect, useRef } from "react";

// 콜백 타입 정의
type Callback = (entries: IntersectionObserverEntry[]) => void;

// 옵저버 설정값 타입 정의
interface ObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

// 커스텀 훅 정의
export const useIntersectionObserver = (
  callback: Callback,
  options?: ObserverOptions
) => {
  const targetRef = useRef<HTMLElement | null>(null); // 관찰할 DOM 요소

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // 컴포넌트 unmount 시 옵저버 해제
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [callback, options]);

  return targetRef; // ref 반환 → 컴포넌트에서 연결 가능
};
