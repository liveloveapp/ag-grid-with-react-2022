import { ICellEditor, ICellEditorParams } from "ag-grid-community";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const ColorEditor = forwardRef<ICellEditor, ICellEditorParams>((props, ref) => {
  const [value, setValue] = useState(props.value);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    getValue: () => value,
  }));

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      type="color"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
});

export default ColorEditor;
