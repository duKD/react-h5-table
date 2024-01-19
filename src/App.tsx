import { useRef, useState } from "react";
import {
  H5Table,
  clickOptions,
  columnItemType,
  sortStatusType,
} from "../lib/h5-table";

import Styles from "./App.module.scss";

function App() {
  type dataType = {
    id: number;
    type?: number;
    select: string;
    position: string;
    use: string;
    markValue: string;
    cur: string;
    cost: string;
    newPrice: number;
    float: string;
    profit: string;
    count: string;
  };
  const column: Array<columnItemType<dataType>> = [
    {
      title: "班费/总值",
      width: 250,
      dataIndex: "rateAndSum",
      render(item, _index) {
        return (
          <section className="nameAndMarkValue">
            <div className="name">
              {item.select}
              <span className="type">{item.type === 1 ? "深" : "沪"}</span>
            </div>
            <div className="markValue">
              {item.markValue}=={item.id}
            </div>
          </section>
        );
      },
      align: "left",
    },
    {
      title: "持仓/可用",
      dataIndex: "positionAndUse",
      sortable: true,
      width: 200,
      align: "right",
      render(item, _index) {
        return (
          <section className="positionAndUse">
            <div className="position">{item.position}</div>
            <div className="use">{item.use}</div>
          </section>
        );
      },
    },
    {
      title: "现价/成本",
      dataIndex: "curAndCost",
      sortable: true,
      width: 200,
      align: "right",
      render(item) {
        return (
          <section className="curAndCost">
            <div className="cur">{item.cur}</div>
            <div className="cost">{item.cost}</div>
          </section>
        );
      },
    },
    {
      title: "浮动/盈亏",
      dataIndex: "float",
      width: 200,
      align: "right",
      render(item) {
        return (
          <section className="floatAndProfit">
            <div className="float">{item.float}</div>
            <div className="profit">{item.profit}</div>
          </section>
        );
      },
    },
    {
      title: "账户资产",
      dataIndex: "count",
      width: 200,
    },
  ];

  const temp = Array.from({ length: 20 }).map((item, index) => {
    return {
      id: index,
      select: "三年二班",
      type: 1,
      position: `${27000 + index * 10}`,
      use: "5,000",
      markValue: "500,033.341",
      cur: "30.004",
      cost: "32.453",
      newPrice: 20,
      float: "+18,879.09",
      profit: "-5.45%",
      count: "120,121",
    };
  });

  const dataRef = useRef(temp);

  const [data, setData] = useState(temp);

  const [pullDownProps, setPullDownProps] = useState({
    offset: 10,
    error: false, // 数据加载失败
    loading: false, // 数据处于加载状态
    finish: false, // 数据 是否完全加载
    loadingText: "加载中...", // 加载文案
    errorText: "出错了", // 失败文案
    finishedText: "到底了", // 完成文案
  });

  const onload = () => {
    setTimeout(() => {
      const len = data.length;
      setData(
        data.concat(
          Array.from({ length: 10 }).map((item, index) => {
            return {
              id: len + index,
              select: "三年二班",
              type: 1,
              position: "28000",
              use: "5,000",
              markValue: "500,033.341",
              cur: "30.004",
              cost: "32.453",
              newPrice: 20,
              float: "+18,879.09",
              profit: "-5.45%",
              count: "120,121",
            };
          })
        )
      );
      dataRef.current = dataRef.current.concat(
        Array.from({ length: 10 }).map((item, index) => {
          return {
            id: len + index,
            select: "三年二班",
            type: 1,
            position: "28000",
            use: "5,000",
            markValue: "500,033.341",
            cur: "30.004",
            cost: "32.453",
            newPrice: 20,
            float: "+18,879.09",
            profit: "-5.45%",
            count: "120,121",
          };
        })
      );
      setPullDownProps({
        ...pullDownProps,
        loading: false,
      });
    }, 1000);
  };

  const changePullDownProps = (args: any) => {
    setPullDownProps(args);
  };

  /**
   * 处理排序按钮回调 处理逻辑交给开发
   * @param propsKey 点击的列名
   * @param type 0 默认 1 升 2 降
   * @returns
   */
  const handleHeadSortClick = (propsKey: string, type: sortStatusType) => {
    if (type === 0) {
      setData(dataRef.current);
      return;
    }
    if (propsKey === "positionAndUse") {
      if (type === 1) {
        const temp = [...dataRef.current].sort(
          (a, b) => Number(b.position) - Number(a.position)
        );
        setData(temp);
      } else {
        const temp = [...dataRef.current].sort(
          (a, b) => Number(a.position) - Number(b.position)
        );
        setData(temp);
      }
    }

    if (propsKey === "curAndCost") {
      if (type === 1) {
        const temp = [...dataRef.current].sort(
          (a, b) => Number(b.cur) - Number(a.cur)
        );
        setData(temp);
      } else {
        const temp = [...dataRef.current].sort(
          (a, b) => Number(a.cur) - Number(b.cur)
        );
        setData(temp);
      }
    }
  };

  const handelSell = () => {
    console.log("handelSell----");
  };

  const clickOptions: clickOptions<dataType> = {
    clickRender(item, index) {
      return (
        <section className={Styles["rowDownMark"]}>
          <div className={Styles["rowDownMark-item"]} onClick={handelSell}>
            买入
          </div>
          <div className={Styles["rowDownMark-item"]}>卖出</div>
          <div className={Styles["rowDownMark-item"]}>行情</div>
        </section>
      );
    },
    clickHeight: 60,
  };

  return (
    <>
      <H5Table<dataType>
        disable
        column={column}
        tableData={data}
        onload={onload}
        pullDownProps={pullDownProps}
        changePullDownProps={changePullDownProps}
        handleHeadSortClick={handleHeadSortClick}
        clickOptions={clickOptions}
      ></H5Table>
    </>
  );
}

export default App;
