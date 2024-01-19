import { MutableRefObject } from "react";
import { columnItemType } from "../types";
export default function useCalculateTableSize(tableRef: MutableRefObject<HTMLElement | undefined>, rowHeight: number, showRowNum: number, minTableHeight: number, rootValue: number, column: Array<columnItemType>): {
    tableWidth: number;
    tableContentWidth: number;
    tableHeight: number;
};
