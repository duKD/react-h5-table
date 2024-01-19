import { MutableRefObject, useEffect, useMemo, useState } from "react";
import { columnItemType } from "../types";
import useResize from "./useResize";

export default function useCalculateTableSize(
  tableRef: MutableRefObject<HTMLElement | undefined>,
  rowHeight: number,
  showRowNum: number,
  minTableHeight: number,
  rootValue: number,
  column: Array<columnItemType>
) {
  const [tableWidth, setTableWidth] = useState<number>(0);
  const [tableContentWidth, setTableContentWidth] = useState<number>(0);

  const tableHeight = useMemo(() => {
    return Math.max(rowHeight * showRowNum, minTableHeight);
  }, [rowHeight, showRowNum, minTableHeight]);

  //计算 表格内容的宽度
  const calculateTableContent = () => {
    const rem = Number(
      document.documentElement.style.fontSize.replace("px", "")
    );
    const width = column.reduce((a, b) => {
      return a + b.width;
    }, 0);

    setTableContentWidth((width * rem) / rootValue);
  };

  //计算 表格可视区宽度
  const calculateTableWidth = () => {
    if (tableRef.current) {
      setTableWidth(tableRef.current.clientWidth);
    }
  };

  useResize([calculateTableContent, calculateTableWidth]);

  useEffect(() => {
    calculateTableContent();
    calculateTableWidth();
  }, []);

  return { tableWidth, tableContentWidth, tableHeight };
}
