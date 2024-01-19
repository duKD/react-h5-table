import { ForwardedRef, forwardRef, useEffect } from "react";
import H5TableCell from "../h5TableCell";
import { cellSize } from "../../utils";
import { columnItemType, sortStatusType } from "../../types";
import { useState } from "react";
import Styles from "./style/index.module.scss";

type PropsType = {
  column: Array<columnItemType>;
  height?: number;
  rootValue: number;
  handleHeadSortClick: (dataIndex: string, val: sortStatusType) => void;
};

export default forwardRef(function H5TableHeader(
  { height = 60, column, rootValue, handleHeadSortClick }: PropsType,
  ref: ForwardedRef<any>
) {
  const [sortStatus, setSortStatus] = useState<{ [p: string]: sortStatusType }>(
    {}
  );

  const changeSortStatus = (item: columnItemType) => {
    if (!item.dataIndex || !item.sortable) return;
    const type = sortStatus[item.dataIndex] || 0;

    const val = ((type + 1) % 3) as sortStatusType;

    handleHeadSortClick(item.dataIndex, val);

    setSortStatus({ [item.dataIndex]: val });
  };
  return (
    <div ref={ref} className={Styles["title"]}>
      {column.map((columnItem, index) => {
        return (
          <div
            key={index}
            className={[
              Styles["table-row-column"],
              index === 0 ? Styles["first-table-row-column"] : "",
            ].join(" ")}
            style={{
              width: cellSize(columnItem.width, rootValue),
              height: cellSize(height, rootValue),
              textAlign: columnItem.align || "center",
            }}
            onClick={() => changeSortStatus(columnItem)}
          >
            <H5TableCell
              // render={columnItem.render}
              dataValue={columnItem.title}
            />
            {columnItem.sortable && columnItem.dataIndex && (
              <span
                className={[
                  Styles["table-caret-wrapper"],
                  sortStatus[columnItem.dataIndex] === 1
                    ? Styles["is-ascending"]
                    : "",
                  sortStatus[columnItem.dataIndex] === 2
                    ? Styles["is-descending"]
                    : "",
                ].join(" ")}
              >
                <i
                  className={[Styles["sort-caret"], Styles["ascending"]].join(
                    " "
                  )}
                ></i>
                <i
                  className={[Styles["sort-caret"], Styles["descending"]].join(
                    " "
                  )}
                ></i>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
});
