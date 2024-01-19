import {
  MutableRefObject,
  useEffect,
  useCallback,
  useRef,
  useState,
} from "react";
import useTouchMoveLeftAndRight from "../../../hooks/useTouchMoveLeftAndRight";
import { useScroll } from "../../../hooks/useScroll";

//计算左右能移动的 px 位移
export default function useHandleMove<T = any>(
  list: Array<T>,
  options: {
    target: MutableRefObject<HTMLElement | undefined>;
    tableWidth: number;
    tableContentWidth: number;
    rowHeight: number;
    overScan?: number;
    handleTransform: Function;
    stopPropagation?: boolean;
  }
) {
  const {
    target,
    tableWidth,
    tableContentWidth,
    handleTransform,
    rowHeight,
    overScan = 5,
    stopPropagation = true,
  } = options;
  const previousXRef = useRef<number>(0);
  const transformXRef = useRef<number>(0);
  const [translateY, setTranslateY] = useState(0);
  const [targetList, setTargetList] = useState<{ index: number; data: T }[]>(
    []
  );

  // 重置滚动
  const resetMove = () => {
    previousXRef.current = 0;
    transformXRef.current = 0;
    handleTransform(0);
  };

  const getOffset = (scrollTop: number) => {
    return Math.floor(scrollTop / rowHeight) + 1;
  };

  const getVisibleCount = (containerHeight: number) => {
    return Math.ceil(containerHeight / rowHeight);
  };

  // 获取上部高度
  const getDistanceTop = (index: number) => {
    return index * rowHeight;
  };

  const calculateRange = () => {
    const container = target.current;
    if (container) {
      const { scrollTop, clientHeight } = container;
      console.log("scrollTop----", scrollTop);

      //获取 已经滑动的 行数
      const offset = getOffset(scrollTop);
      // 获取显示区的 行数
      const visibleCount = getVisibleCount(clientHeight);
      // overScan 视区上、下额外展示的行树
      const start = Math.max(0, offset - overScan);

      const end = Math.min(list.length, offset + visibleCount + overScan);

      const offsetTop = getDistanceTop(start);

      setTranslateY(offsetTop);

      setTargetList(
        list.slice(start, end).map((ele, index) => ({
          data: ele,
          index: index + start,
        }))
      );
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

  /**
   *  distanceRef 手指触摸的位移
   */
  const { distanceRef } = useTouchMoveLeftAndRight(target, {
    touchmove,
    touchend,
  });

  const handleScroll = () => {
    calculateRange();
  };

  const scrollTo = (index: number) => {
    console.log("scrollTo----", index, getDistanceTop(index));

    target.current!.scrollTop = getDistanceTop(index);
  };

  useScroll(target, handleScroll);

  useEffect(() => {
    calculateRange();
    resetMove();
  }, [list]);

  return { distanceRef, resetMove, targetList, translateY, scrollTo };
}
