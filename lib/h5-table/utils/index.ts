export const pxToRem = (x: number, rootValue: number) => {
  return x / rootValue + "rem";
};

export const cellSize = (size: number, rootValue: number) => {
  return pxToRem(size, rootValue);
};

export const calculateRealRowHeight = (
  rowHeight: number,
  rootValue: number
) => {
  const rem = Number(document.documentElement.style.fontSize.replace("px", ""));
  return Number((rowHeight / rootValue) * rem);
};
