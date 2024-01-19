import { columnItemType } from "../../types";
type PropsType<T> = {
    render?: columnItemType["render"];
    dataItem?: T;
    index?: number;
    dataValue: string;
};
/**
 *  优先取render 函数的值
 * @param param
 * @returns
 */
export default function H5TableCell<T = any>({ render, dataItem, index, dataValue, }: PropsType<T>): import("react/jsx-runtime").JSX.Element;
export {};
