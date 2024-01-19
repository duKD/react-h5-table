import { MutableRefObject } from "react";
import { tablePropsType, virtualTableInstance } from "../../types";
declare const H5VirtualTableComponent: <T>(props: tablePropsType<T> & {
    ref: MutableRefObject<virtualTableInstance | undefined>;
}) => React.ReactElement;
export default H5VirtualTableComponent;
