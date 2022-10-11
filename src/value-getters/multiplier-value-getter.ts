import { ValueGetterParams } from "ag-grid-community";

export const multiplierValueGetter =
  <
    T extends Record<TKey, TValue>,
    TKey extends string | number | symbol = string,
    TValue = any
  >(
    value: keyof T,
    multiplier: keyof T
  ) =>
  (params: ValueGetterParams<T>): number => {
    if (params.data === undefined) {
      return 0;
    }
    if (typeof params.data[value] === "number") {
    }
    const v = isNaN(Number(params.data[value]))
      ? 0
      : Number(params.data[value]);
    const m = isNaN(Number(params.data[multiplier]))
      ? 1
      : Number(params.data[multiplier]);
    return Math.round(v * m * 100) / 100;
  };
