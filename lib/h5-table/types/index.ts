import React from "react";

export type columnItemType<T = any> = {
  title: string; // 列名
  dataIndex: string; // table data key 值
  width: number; // 列 宽度
  sortable?: boolean; //是否 支持排序
  align?: "left" | "center" | "right"; // 布局
  render?: (item: T, index?: number) => any; //自定义单元格显示的内容
};

// 下拉加载相关配置
export type pullDownPropsType = {
  error?: boolean; // 数据加载失败
  loading?: boolean; // 数据处于加载状态
  finish?: boolean; // 数据 是否完全加载
  loadingText?: string; // 加载文案
  errorText?: string; // 失败文案
  finishedText?: string; // 完成文案
  offset?: number; //触发加载的底部距离
};

//  点击相关配置
export type clickOptions<T> = {
  clickRender: (item: T, index: number) => React.JSX.Element; // 点击列触发渲染
  clickHeight: number; // 显示栏的高度
};

export type tablePropsType<T = any> = {
  rowKey?: string; //表格行 key 的取值字段 默认取id字段
  minTableHeight?: number; //表格最小高度
  showRowNum?: number; // 表格显示几行
  headerHeight?: number; // 头部默认高度
  rowHeight?: number; //每行数据的默认高度
  column: Array<columnItemType<T>>;
  tableData: Array<T>;
  clickOptions?: clickOptions<T>; // 是否需要处理点击事件
  disable?: boolean; // 是否启用下拉加载
  pullDownProps?: pullDownPropsType;
  changePullDownProps?: (args: pullDownPropsType) => void; // 修改加载状态
  handleHeadSortClick?: (propsKey: string, type: sortStatusType) => void;
  onload?: () => void; // 数据加载
  rootValue?: number; //
};

export type virtualTablePropsType<T = any> = {
  rowKey?: string; //表格行 key 的取值字段 默认取id字段
  minTableHeight?: number; //表格最小高度
  showRowNum?: number; // 表格显示几行
  headerHeight?: number; // 头部默认高度
  rowHeight?: number; //每行数据的默认高度
  column: Array<columnItemType<T>>;
  tableData: Array<T>;
  clickOptions?: clickOptions<T>; // 是否需要处理点击事件
  handleHeadSortClick?: (propsKey: string, type: sortStatusType) => void;
  rootValue?: number; //
};

// 0 默认 1 升 2 降
export type sortStatusType = 0 | 1 | 2;

export interface virtualTableInstance {
  scrollIntoView: (index: number) => void;
}
