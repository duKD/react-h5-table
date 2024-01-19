import type { columnItemType } from "../../types";
type propsType<T> = {
    column: Array<columnItemType>;
    handleClick: (index: number) => void;
    dataItem: T;
    height: number;
    rootValue: number;
    rowIndex: number;
};
export default function H5TableRow<T extends {
    [key: string]: any;
}>({ column, dataItem, height, rootValue, rowIndex, handleClick, }: propsType<T>): import("react/jsx-runtime").JSX.Element;
export {};
