import React, {
  LegacyRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { sortStatusType, tablePropsType } from "../../types";
import H5TableCell from "../h5TableCell";
import H5TableHeader from "../h5TableHeader";
import H5TableRow from "../h5TableRow";
import Styles from "./style/index.module.scss";
import { cellSize } from "../../utils";
import useDebounce from "../../hooks/useDebounce";
import useGetTransformX from "../../hooks/useGetTransformX";
import useCalculateTableSize from "../../hooks/useCalculateTableSize";

export default function H5Table<
  T extends {
    [key: string]: any;
  }
>({
  column,
  tableData,
  headerHeight = 80,
  rowKey = "id",
  rowHeight = 100,
  rootValue = 75,
  showRowNum = 6,
  minTableHeight = 600,
  disable = false,
  clickOptions,
  pullDownProps = {
    offset: 10,
    error: false, // 数据加载失败
    loading: false, // 数据处于加载状态
    finish: false, // 数据 是否完全加载
    loadingText: "加载中...", // 加载文案
    errorText: "出错了", // 失败文案
    finishedText: "到底了", // 完成文案
  },
  changePullDownProps = () => {},
  handleHeadSortClick,
  onload = () => {},
}: tablePropsType<T>) {
  // 表格内容部分的ref
  const tableRef = useRef<HTMLElement>();
  const tableHeaderRef = useRef<HTMLDivElement>();
  const tableContentRef = useRef<HTMLElement>();
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

  // 是否显示更多的标记
  const [moreMark, setMoreMark] = useState(false);
  // 表格滚动更多标识
  const [moveShadow, setMoveShadow] = useState(false);
  // 记录点击栏下移px
  const [clickIndex, setClickIndex] = useState(-1);

  const bottomLoadEvent = () => {
    if (pullDownProps.finish) return;
    if (!pullDownProps.loading) {
      changePullDownProps({
        ...pullDownProps,
        loading: true,
      });
      onload();
    }
  };

  const tryAgain = () => {
    if (pullDownProps.error) {
      changePullDownProps({
        ...pullDownProps,
        error: false,
      });
      setTimeout(() => {
        onload();
      });
    }
  };

  const loadingText = useMemo(() => {
    let str = "";
    if (pullDownProps.loading) {
      str = pullDownProps.loadingText || "";
    }
    if (pullDownProps.finish) {
      str = pullDownProps.finishedText || "";
    }
    if (pullDownProps.error) {
      str = pullDownProps.errorText || "";
    }
    return str;
  }, [pullDownProps]);

  const handleTransform = (val: number) => {
    if (tableHeaderRef.current) {
      tableHeaderRef.current.style.transform = `translateX(${val}px)`;
    }
    if (tableContentRef.current) {
      tableContentRef.current.style.transform = `translateX(${val}px)`;
    }
    setMoveShadow(val < 0);
    handleTouchBottom(val);
  };

  //判断 左右滚动 是否触底 显示隐藏 更多的标志 防抖
  const handleTouchBottom = useDebounce((distanceX: number) => {
    if (tableRef.current) {
      const temp = tableContentWidth - (tableWidth - distanceX);
      if (temp >= 0 && temp < 10) {
        setMoreMark(false);
      } else {
        setMoreMark(true);
      }
    }
  }, 200);
  const { distanceRef, resetMove } = useGetTransformX(
    tableRef,
    tableWidth,
    tableContentWidth,
    disable,
    bottomLoadEvent,
    pullDownProps.offset!,
    handleTransform
  );

  const firstColumn = column[0];

  const handleCellSize = (num: number) => {
    return cellSize(num, rootValue);
  };

  const handleHeadSortClickBase = (dataIndex: string, val: sortStatusType) => {
    //点击排序 现把点击栏收起
    setClickIndex(-1);
    handleHeadSortClick && handleHeadSortClick(dataIndex, val);
  };

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
        className={Styles["table"]}
        style={{
          height: handleCellSize(tableHeight),
        }}
      >
        <section
          className={[
            Styles["first-column"],
            moveShadow ? Styles["first-column-move"] : "",
          ].join(" ")}
          style={{
            width: handleCellSize(firstColumn.width),
          }}
        >
          {tableData.map((item, index) => {
            return (
              <div key={item[rowKey]}>
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
                    dataValue={item[firstColumn.dataIndex || ""]}
                    render={firstColumn.render}
                    dataItem={item}
                  />
                </div>
                {clickOptions && clickIndex === index && (
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
        <section ref={tableContentRef as LegacyRef<HTMLElement>}>
          {tableData.map((item, index) => {
            return (
              <div className={Styles["table-row"]} key={item[rowKey]}>
                <H5TableRow
                  column={column}
                  height={rowHeight}
                  rootValue={rootValue}
                  dataItem={item}
                  rowIndex={index}
                  handleClick={handleClick}
                />
                {clickOptions && clickIndex === index && (
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
        {disable && (
          <section className={Styles["loading"]} onClick={tryAgain}>
            {loadingText}
          </section>
        )}
        {clickOptions && clickIndex !== -1 && (
          <div
            className={Styles["rowMarkContainer"]}
            style={{
              top: handleCellSize(rowHeight * (clickIndex + 1)),
            }}
          >
            {clickOptions.clickRender(tableData[clickIndex], clickIndex)}
          </div>
        )}
      </div>
    </>
  );
}
