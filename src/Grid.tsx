import React, { useMemo, useState } from "react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import data from "./data.json";
import { NameCellRenderer, NameCellRendererParams } from "./cell-renderers";
import { decimalValueFormatter } from "./value-formatters";
import { multiplierValueGetter } from "./value-getters";

interface RowData {
  name: string;
  price: string;
  color: string;
  taxRate: number;
}

export default function Grid() {
  const [columnDefs] = useState<ColDef<RowData>[]>([
    {
      headerName: "Name",
      field: "name",
      cellRenderer: NameCellRenderer,
      cellRendererParams: {
        document,
        click: ({ data }: any) => window.alert(`You clicked: ${data.name}`),
        isAbbreviated: () => true,
      } as NameCellRendererParams<RowData>,
    },
    { headerName: "Color", field: "color" },
    {
      headerName: "price",
      valueGetter: multiplierValueGetter<RowData>("price", "taxRate"),
      valueFormatter: decimalValueFormatter<RowData, Pick<RowData, "price">>(2),
    },
  ]);
  const rowData = useMemo<RowData[]>(() => {
    return data.products.map((product) => ({
      ...product,
      taxRate: 0.06,
    }));
  }, [data]);
  const defaultColDef = useMemo<ColDef<RowData>>(() => {
    return {
      sortable: true,
      filter: true,
    };
  }, []);

  return (
    <div className="ag-theme-alpine">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
      ></AgGridReact>
    </div>
  );
}
