import { useEffect, MutableRefObject, useRef } from "react";

const getAngle = (x: number, y: number) => {
  return (Math.atan2(y, x) * 180) / Math.PI;
};

const getTouchDirection = (x: number, y: number) => {
  if (Math.abs(x) > 5) {
    const angle = getAngle(x, y);
    if (angle >= -45 && angle <= 45) {
      // 向右
      return "right";
    } else if (
      (angle >= 135 && angle <= 180) ||
      (angle >= -180 && angle < -135)
    ) {
      // 向左
      return "left";
    }
  } else {
    return "";
  }
};

//计算元素 滑动距离
export default function useTouchMoveLeftAndRight(
  target: MutableRefObject<HTMLElement | undefined>,
  options: {
    touchstart?: Function;
    touchmove: Function;
    touchend?: Function;
  }
) {
  //滑动距离

  const distanceRef = useRef({ distanceX: 0, distanceY: 0 });

  // 位置标记 开始
  const start = useRef({
    x: 0,
    y: 0,
  });
  // 位置标记 结束
  const end = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const startHandle = (event: TouchEvent) => {
      const touch: Touch = event.touches[0];
      if (touch) {
        start.current.x = touch.pageX;
        start.current.y = touch.pageY;
        options?.touchstart?.(event);
      }
    };

    const moveHandle = (event: TouchEvent) => {
      const touch: Touch = event.touches[0];
      if (touch) {
        end.current.x = touch.pageX;
        end.current.y = touch.pageY;
        const direction = getTouchDirection(
          end.current.x - start.current.x,
          end.current.y - start.current.y
        );
        distanceRef.current = {
          distanceX: end.current.x - start.current.x,
          distanceY: end.current.y - start.current.y,
        };
        options?.touchmove?.(event, direction, {
          distanceX: end.current.x - start.current.x,
          distanceY: end.current.y - start.current.y,
        });
      }
    };

    const endHandle = (event: TouchEvent) => {
      const touch: Touch = event.changedTouches[0];
      if (touch) {
        end.current.x = touch.pageX;
        end.current.y = touch.pageY;
        distanceRef.current = { distanceX: 0, distanceY: 0 };
        options?.touchend?.(event);
      }
    };
    const targetRef = target.current;
    if (targetRef) {
      targetRef.addEventListener("touchstart", startHandle, { passive: false });
      targetRef.addEventListener("touchmove", moveHandle, { passive: false });
      targetRef.addEventListener("touchend", endHandle, { passive: false });
    }
    return () => {
      if (targetRef) {
        targetRef.removeEventListener("touchstart", startHandle);
        targetRef.removeEventListener("touchmove", moveHandle);
        targetRef.removeEventListener("touchend", endHandle);
      }
    };
  }, [options, target]);

  return { distanceRef };
}
