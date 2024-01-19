/// <reference types="react" />
import { columnItemType, sortStatusType } from "../../types";
type PropsType = {
    column: Array<columnItemType>;
    height?: number;
    rootValue: number;
    handleHeadSortClick: (dataIndex: string, val: sortStatusType) => void;
};
declare const _default: import("react").ForwardRefExoticComponent<PropsType & import("react").RefAttributes<any>>;
export default _default;
