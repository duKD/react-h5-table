import React from "react";
export type columnItemType<T = any> = {
    title: string;
    dataIndex: string;
    width: number;
    sortable?: boolean;
    align?: "left" | "center" | "right";
    render?: (item: T, index?: number) => any;
};
export type pullDownPropsType = {
    error?: boolean;
    loading?: boolean;
    finish?: boolean;
    loadingText?: string;
    errorText?: string;
    finishedText?: string;
    offset?: number;
};
export type clickOptions<T> = {
    clickRender: (item: T, index: number) => React.JSX.Element;
    clickHeight: number;
};
export type tablePropsType<T = any> = {
    rowKey?: string;
    minTableHeight?: number;
    showRowNum?: number;
    headerHeight?: number;
    rowHeight?: number;
    column: Array<columnItemType<T>>;
    tableData: Array<T>;
    clickOptions?: clickOptions<T>;
    disable?: boolean;
    pullDownProps?: pullDownPropsType;
    changePullDownProps?: (args: pullDownPropsType) => void;
    handleHeadSortClick?: (propsKey: string, type: sortStatusType) => void;
    onload?: () => void;
    rootValue?: number;
};
export type virtualTablePropsType<T = any> = {
    rowKey?: string;
    minTableHeight?: number;
    showRowNum?: number;
    headerHeight?: number;
    rowHeight?: number;
    column: Array<columnItemType<T>>;
    tableData: Array<T>;
    clickOptions?: clickOptions<T>;
    handleHeadSortClick?: (propsKey: string, type: sortStatusType) => void;
    rootValue?: number;
};
export type sortStatusType = 0 | 1 | 2;
export interface virtualTableInstance {
    scrollIntoView: (index: number) => void;
}
