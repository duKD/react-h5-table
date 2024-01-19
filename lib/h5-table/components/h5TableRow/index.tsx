import { useEffect } from "react";
import type { columnItemType } from "../../types";
import { cellSize } from "../../utils";
import H5TableCell from "../h5TableCell";
import Styles from "./style/index.module.scss";

type propsType<T> = {
  column: Array<columnItemType>;
  handleClick: (index: number) => void;
  dataItem: T;
  height: number;
  rootValue: number;
  rowIndex: number;
};

export default function H5TableRow<T extends { [key: string]: any }>({
  column,
  dataItem,
  height,
  rootValue,
  rowIndex,
  handleClick,
}: propsType<T>) {
  return (
    <section className={Styles["table-row"]}>
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
            onClick={() => {
              handleClick(rowIndex);
            }}
          >
            <H5TableCell
              index={rowIndex}
              render={columnItem.render}
              dataItem={dataItem}
              dataValue={dataItem[columnItem.dataIndex || ""]}
            />
          </div>
        );
      })}
    </section>
  );
}
