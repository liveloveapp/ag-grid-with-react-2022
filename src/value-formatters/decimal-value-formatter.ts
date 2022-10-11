import { ValueFormatterParams } from "ag-grid-community";

export const decimalValueFormatter =
  <TData, TValue = number>(digits = 0) =>
  (params: ValueFormatterParams<TData, TValue>): string => {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
    if (params.value === undefined) {
      return formatter.format(0);
    }
    return formatter.format(Number(params.value));
  };
