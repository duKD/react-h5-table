import { useEffect, useRef } from "react";

export default function useDebounce(fn: Function, delay: number) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = (...args: any[]) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    timerRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  useEffect(() => {
    // 在组件卸载时清除定时器，防止内存泄漏
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, []);

  return debounce;
}
