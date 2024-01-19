import { useEffect } from "react";

export default function useResize(
  fn: Array<(this: Window, ev: UIEvent) => any>
) {
  useEffect(() => {
    fn.forEach((item) => {
      window.addEventListener("resize", item);
    });
    () => {
      fn.forEach((item) => {
        window.removeEventListener("resize", item);
      });
    };
  }, [fn]);
}
