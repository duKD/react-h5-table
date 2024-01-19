import { columnItemType } from "../../types";
import Styles from "./index.module.scss";

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
export default function H5TableCell<T = any>({
  render,
  dataItem,
  index,
  dataValue,
}: PropsType<T>) {
  return (
    <>
      {render ? (
        render(dataItem, index)
      ) : (
        <div className={Styles["table-cell"]}>{dataValue}</div>
      )}
    </>
  );
}
