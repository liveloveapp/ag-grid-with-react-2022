import React, { useState } from "react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import data from "./data.json";

interface RowData {
  name: string;
  color: string;
}

export default function Grid() {
  /**
   * 1. Specify the `columnDef` column definition state and bind to the `<AgGridReact>` component.
   */

  /**
   * 2. Set the `rowData` state using the existing `data` import (data.products),
   *    and bind to the `<AgGridReact>` component.
   */

  return (
    <div className="ag-theme-alpine">
      <AgGridReact></AgGridReact>
    </div>
  );
}
