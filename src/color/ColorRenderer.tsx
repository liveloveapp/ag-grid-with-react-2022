import { ICellRendererParams } from "ag-grid-community";

export default function ColorRenderer(props: ICellRendererParams) {
  const { value } = props;
  return (
    <div
      style={{
        backgroundColor: value,
        display: "block",
        width: "120px",
        height: "28px",
      }}
    />
  );
}
