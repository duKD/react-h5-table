import { MutableRefObject } from "react";
export default function useHandleMove<T = any>(list: Array<T>, options: {
    target: MutableRefObject<HTMLElement | undefined>;
    tableWidth: number;
    tableContentWidth: number;
    rowHeight: number;
    overScan?: number;
    handleTransform: Function;
    stopPropagation?: boolean;
}): {
    distanceRef: MutableRefObject<{
        distanceX: number;
        distanceY: number;
    }>;
    resetMove: () => void;
    targetList: {
        index: number;
        data: T;
    }[];
    translateY: number;
    scrollTo: (index: number) => void;
};
