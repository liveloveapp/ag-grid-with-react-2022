import {
  ColDef,
  Column,
  ColumnApi,
  GridApi,
  ICellRendererComp,
  ICellRendererParams,
  RowNode,
  ValueGetterParams,
} from "ag-grid-community";
import { NameCellRendererClickEvent } from "./name-cell-renderer-click-event.interface";
import { NameCellRendererData } from "./name-cell-renderer-data.interface";
import { NameCellRendererParams } from "./name-cell-renderer-params.interface";

type Params<T> = NameCellRendererParams<T> & ICellRendererParams<T, string>;

/**
 * AG Grid cell renderer for a user name.
 */
export class NameCellRenderer<T extends NameCellRendererData>
  implements ICellRendererComp<T>
{
  /** AG Grid API. */
  private api: GridApi<T> | null = null;

  /** The button element. */
  private btnEl: HTMLButtonElement | null = null;

  /** Provided callback function that is invoked when the button is clicked. */
  private click:
    | ((event: NameCellRendererClickEvent<T, MouseEvent>) => void)
    | null = null;

  /** The column definition. */
  private colDef!: ColDef<T>;

  /** The AG Grid column. */
  private column: Column | null = null;

  /** AG Grid Column API. */
  private columnApi!: ColumnApi;

  /** AG Grid context. */
  private context: any;

  /** The provided data. */
  private data: T | undefined;

  /** The global document. */
  private document: Document | null = null;

  /** Execution context bound function when the button is clicked. */
  private handleClick:
    | ((this: NameCellRenderer<T>, event: MouseEvent) => void)
    | null = null;

  /** Callback function to determinate if the name is abbreviated. */
  private isAbbreviated?: (params: ValueGetterParams<T>) => boolean;

  /** AG Grid row node. */
  private node!: RowNode<T>;

  /** The user name. */
  private value = "";

  /** Value getter params to be provided. */
  get valueGetterParams(): ValueGetterParams<T> {
    return {
      api: this.api!,
      colDef: this.colDef,
      column: this.column!,
      columnApi: this.columnApi,
      context: this.context,
      data: this.data,
      getValue: (field?: string) =>
        this.data && field ? (this.data as any)[field] : this.value,
      node: this.node,
    };
  }

  init(params: Params<T>): void {
    this.updateParams(params);
    this.setGui();
  }

  destroy(): void {
    if (this.handleClick !== null && this.btnEl !== null) {
      this.btnEl.removeEventListener("click", this.handleClick as any);
    }
  }

  getGui(): HTMLElement {
    return this.btnEl!;
  }

  refresh(params: Params<T>): boolean {
    this.updateParams(params);
    const isAbbreviated = this.isAbbreviated?.(this.valueGetterParams) ?? false;
    this.value = this.transform(params.value, isAbbreviated);
    if (this.btnEl) {
      this.btnEl.innerHTML = this.value;
    }
    return true;
  }

  private setGui(): void {
    this.btnEl = this.document!.createElement("button") as HTMLButtonElement;
    this.btnEl.classList.add("user-name-cell");
    this.handleClick = (event) => {
      if (this.click) {
        this.click({
          event,
          data: this.data!,
        });
      }
    };
    const isAbbreviated = this.isAbbreviated?.(this.valueGetterParams) ?? false;
    this.btnEl.innerHTML = this.transform(this.value, isAbbreviated);
    this.btnEl.addEventListener("click", this.handleClick as any);
  }

  private updateParams(params: Params<T>): void {
    this.api = params.api;
    this.click = params.click;
    this.colDef = params.colDef!;
    this.column = params.column!;
    this.columnApi = params.columnApi;
    this.context = params.context;
    this.data = params.data;
    this.document = params.document;
    this.isAbbreviated = params.isAbbreviated;
    this.node = params.node;
    this.value = params.value;
  }

  private transform(value: string, isAbbreviated: boolean): string {
    if (isAbbreviated) {
      return value.replace(/^Model/i, "");
    }
    return value;
  }
}
