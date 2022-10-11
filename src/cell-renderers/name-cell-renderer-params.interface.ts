import { ValueGetterParams } from "ag-grid-community";
import { NameCellRendererClickEvent } from "./name-cell-renderer-click-event.interface";

export interface NameCellRendererParams<T> {
  click: (event: NameCellRendererClickEvent<T>) => void;
  document: Document;
  isAbbreviated?: (params: ValueGetterParams<T>) => boolean;
}
