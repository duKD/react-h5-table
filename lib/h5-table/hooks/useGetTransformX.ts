import { MutableRefObject, useEffect, useCallback, useRef } from "react";
import useTouchMoveLeftAndRight from "./useTouchMoveLeftAndRight";
import { useScroll } from "./useScroll";

//计算左右能移动的 px 位移
export default function useGetTransformX(
  target: MutableRefObject<HTMLElement | undefined>,
  tableWidth: number,
  tableContentWidth: number,
  disable: boolean,
  bottomLoadEvent: Function,
  offset: number,
  handleTransform: Function,
  stopPropagation: boolean = true
) {
  const previousXRef = useRef<number>(0);
  const transformXRef = useRef<number>(0);

  // 重置滚动
  const resetMove = () => {
    previousXRef.current = 0;
    transformXRef.current = 0;
    handleTransform(0);
  };

  const handleBottom = () => {
    if (target.current) {
      if (
        target.current.scrollHeight - target.current.scrollTop <
        target.current.clientHeight + offset
      ) {
        disable && bottomLoadEvent();
      }
    }
  };

  const touchend = () => {
    previousXRef.current = transformXRef.current;
  };

  const touchmove = useCallback(
    (
      event: TouchEvent,
      direction: string,
      curDistance: { distanceX: number; distanceY: number }
    ) => {
      if (direction) {
        event.cancelable && event.preventDefault();

        const max = tableContentWidth - tableWidth;
        // 只有表格内容超过了 表格外部 才让拖动
        if (max > 0) {
          const temp = Math.min(
            previousXRef.current + curDistance.distanceX,
            0
          );
          const res = Math.max(-max, temp);
          transformXRef.current = res;
          handleTransform(res);
        }
      }

      // 兼容处理 滚动事件行为
      if (stopPropagation) {
        if (target.current?.scrollTop !== 0) {
          event.stopPropagation();
        }
      }
    },
    [handleTransform, stopPropagation, tableContentWidth, tableWidth, target]
  );

  const { distanceRef } = useTouchMoveLeftAndRight(target, {
    touchmove,
    touchend,
  });

  const handleScroll = () => {
    if (distanceRef.current.distanceY <= 0) {
      handleBottom();
    }
  };

  useScroll(target, handleScroll);

  useEffect(() => {
    handleBottom();
  }, []);

  return { distanceRef, resetMove };
}
