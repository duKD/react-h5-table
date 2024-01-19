import { MutableRefObject, useCallback, useEffect } from "react";

export function useScroll(
  target: MutableRefObject<HTMLElement | undefined>,
  handleScroll: Function
) {
  const handleScrollBase = useCallback(() => {
    handleScroll();
  }, [handleScroll]);
  useEffect(() => {
    const curRef = target.current;
    if (curRef) {
      curRef.addEventListener("scroll", handleScrollBase, {
        passive: false,
      });
    }
    return () => {
      if (curRef) {
        curRef.removeEventListener("scroll", handleScrollBase);
      }
    };
  }, [target, handleScrollBase]);
}
