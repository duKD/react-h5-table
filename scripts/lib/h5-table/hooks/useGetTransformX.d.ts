import { MutableRefObject } from "react";
export default function useGetTransformX(target: MutableRefObject<HTMLElement | undefined>, tableWidth: number, tableContentWidth: number, disable: boolean, bottomLoadEvent: Function, offset: number, handleTransform: Function, stopPropagation?: boolean): {
    distanceRef: MutableRefObject<{
        distanceX: number;
        distanceY: number;
    }>;
    resetMove: () => void;
};
