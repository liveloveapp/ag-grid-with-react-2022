import React, { useState } from "react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import data from "./data.json";

interface RowData {
  name: string;
  color: string;
}

export default function Grid() {
  return (
    <div className="ag-theme-alpine">
      <AgGridReact></AgGridReact>
    </div>
  );
}
