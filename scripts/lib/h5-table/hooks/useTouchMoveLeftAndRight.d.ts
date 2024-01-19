import { MutableRefObject } from "react";
export default function useTouchMoveLeftAndRight(target: MutableRefObject<HTMLElement | undefined>, options: {
    touchstart?: Function;
    touchmove: Function;
    touchend?: Function;
}): {
    distanceRef: MutableRefObject<{
        distanceX: number;
        distanceY: number;
    }>;
};
