import {
  useState,
  useRef,
  LegacyRef,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
  MutableRefObject,
} from "react";
import {
  sortStatusType,
  tablePropsType,
  virtualTableInstance,
} from "../../types";
import Styles from "./style/index.module.scss";
import { cellSize, calculateRealRowHeight } from "../../utils";
import H5TableCell from "../h5TableCell";
import H5TableHeader from "../h5TableHeader";
import useCalculateTableSize from "../../hooks/useCalculateTableSize";
import H5TableRow from "../h5TableRow";
import useHandleMove from "./hooks/useHandleMove";
import useDebounce from "../../hooks/useDebounce";

function H5VirtualTable<
  T extends {
    [key: string]: any;
  }
>(
  {
    column,
    tableData,
    headerHeight = 80,
    rowKey = "id",
    rowHeight = 100,
    rootValue = 75,
    showRowNum = 6,
    minTableHeight = 600,
    clickOptions,
    handleHeadSortClick,
  }: tablePropsType<T>,
  ref: ForwardedRef<virtualTableInstance>
) {
  // 表格内容部分的ref
  const tableRef = useRef<HTMLElement>();
  const tableHeaderRef = useRef<HTMLDivElement>();
  const tableContentRef = useRef<HTMLElement>();
  const firstColumn = column[0];

  // 表格滚动更多标识
  const [moveShadow, setMoveShadow] = useState(false);

  // 是否显示更多的标记
  const [moreMark, setMoreMark] = useState(false);

  // 记录点击栏下移px
  const [clickIndex, setClickIndex] = useState(-1);

  // 表格高度
  // 表格宽度
  // 表格内容宽度
  const { tableHeight, tableWidth, tableContentWidth } = useCalculateTableSize(
    tableRef,
    rowHeight,
    showRowNum,
    minTableHeight,
    rootValue,
    column
  );

  const handleTransform = (val: number) => {
    if (tableHeaderRef.current) {
      tableHeaderRef.current.style.transform = `translateX(${val}px)`;
    }
    if (tableContentRef.current) {
      tableContentRef.current.style.transform = `translateX(${val}px)`;
    }
    setMoveShadow(val < 0);
    handleNeedShowMore(val);
  };

  //判断 左右滚动 是否触底 显示隐藏 更多的标志 防抖
  const handleNeedShowMore = useDebounce((distanceX: number) => {
    if (tableRef.current) {
      const temp = tableContentWidth - (tableWidth - distanceX);
      if (temp >= 0 && temp < 10) {
        setMoreMark(false);
      } else {
        setMoreMark(true);
      }
    }
  }, 200);

  const { distanceRef, targetList, translateY, scrollTo } = useHandleMove<T>(
    tableData,
    {
      target: tableRef,
      tableWidth,
      tableContentWidth,
      rowHeight: calculateRealRowHeight(rowHeight, rootValue),
      handleTransform,
      overScan: 20,
    }
  );

  const handleClick = (index: number) => {
    if (!clickOptions) return;
    //只有 左右 上下 移动 都在 20像素之内 才判定 用户点击
    if (
      Math.abs(distanceRef.current.distanceX) < 20 &&
      Math.abs(distanceRef.current.distanceY) < 20
    ) {
      setClickIndex((state) => {
        return state === index ? -1 : index;
      });
    }
  };

  const handleCellSize = (num: number) => {
    return cellSize(num, rootValue);
  };

  const handleHeadSortClickBase = (dataIndex: string, val: sortStatusType) => {
    //点击排序 现把点击栏收起
    setClickIndex(-1);
    handleHeadSortClick && handleHeadSortClick(dataIndex, val);
  };

  useImperativeHandle(ref, () => ({
    scrollIntoView: (index) => {
      scrollTo(index);
    },
  }));

  return (
    <>
      <section className={Styles["table-header"]}>
        <div
          className={[
            Styles["fixed-title-mark"],
            moveShadow ? Styles["first-column-move"] : "",
          ].join(" ")}
          style={{
            width: handleCellSize(firstColumn.width),
            height: handleCellSize(headerHeight),
            textAlign: firstColumn.align || "center",
          }}
        >
          <H5TableCell dataValue={firstColumn.title} />
        </div>
        {moreMark && (
          <div
            className={Styles["fixed-title-more"]}
            style={{
              height: handleCellSize(headerHeight),
            }}
          >
            <div className={Styles["mark"]}></div>
          </div>
        )}
        <H5TableHeader
          ref={tableHeaderRef}
          column={column}
          rootValue={rootValue}
          height={headerHeight}
          handleHeadSortClick={handleHeadSortClickBase}
        />
      </section>
      <div
        ref={tableRef as LegacyRef<HTMLDivElement>}
        className={Styles["virtualTable"]}
        style={{
          height: handleCellSize(tableHeight),
        }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            height: handleCellSize(rowHeight * tableData.length),
          }}
        ></div>
        <section
          className={[
            Styles["first-column"],
            moveShadow ? Styles["first-column-move"] : "",
          ].join(" ")}
          style={{
            top: translateY + "px",
            width: handleCellSize(firstColumn.width),
          }}
        >
          {targetList.map((item) => {
            return (
              <div key={item.data[rowKey]}>
                <div
                  className={[
                    Styles["table-row-column"],
                    Styles["first-table-row-column"],
                  ].join(" ")}
                  style={{
                    width: handleCellSize(firstColumn.width),
                    height: handleCellSize(rowHeight),
                    textAlign: firstColumn.align || "center",
                  }}
                >
                  <H5TableCell
                    dataValue={item.data[firstColumn.dataIndex || ""]}
                    render={firstColumn.render}
                    dataItem={item.data}
                  />
                </div>
                {clickOptions && clickIndex === item.index && (
                  <div
                    style={{
                      height: handleCellSize(clickOptions.clickHeight),
                    }}
                  />
                )}
              </div>
            );
          })}
        </section>
        <section
          className={Styles["table-content"]}
          style={{
            top: translateY + "px",
          }}
          ref={tableContentRef as LegacyRef<HTMLElement>}
        >
          {targetList.map((item) => {
            return (
              <div className={Styles["table-row"]} key={item.data[rowKey]}>
                <H5TableRow
                  column={column}
                  height={rowHeight}
                  rootValue={rootValue}
                  dataItem={item.data}
                  rowIndex={item.index}
                  handleClick={handleClick}
                />
                {clickOptions && clickIndex === item.index && (
                  <div
                    style={{
                      height: handleCellSize(clickOptions.clickHeight),
                    }}
                  />
                )}
              </div>
            );
          })}
        </section>
        {clickOptions && clickIndex !== -1 && (
          <div
            className={Styles["rowMarkContainer"]}
            style={{
              top: handleCellSize(rowHeight * (clickIndex + 1)),
            }}
          >
            {clickOptions.clickRender(
              targetList.find((val) => {
                return val.index === clickIndex;
              }) as any,
              clickIndex
            )}
          </div>
        )}
      </div>
    </>
  );
}

const H5VirtualTableComponent = forwardRef<
  virtualTableInstance,
  tablePropsType
>(H5VirtualTable) as <T>(
  props: tablePropsType<T> & {
    ref: MutableRefObject<virtualTableInstance | undefined>;
  }
) => React.ReactElement;

export default H5VirtualTableComponent;
