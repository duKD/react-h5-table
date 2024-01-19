import { tablePropsType } from "../../types";
export default function H5Table<T extends {
    [key: string]: any;
}>({ column, tableData, headerHeight, rowKey, rowHeight, rootValue, showRowNum, minTableHeight, disable, clickOptions, pullDownProps, changePullDownProps, handleHeadSortClick, onload, }: tablePropsType<T>): import("react/jsx-runtime").JSX.Element;
