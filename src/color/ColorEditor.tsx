import { ICellEditor, ICellEditorParams } from "ag-grid-community";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const ColorEditor = forwardRef<ICellEditor, ICellEditorParams>((props, ref) => {
  /**
   * 1. Use props.value to set the initial value of the input
   */
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    /**
     * 2. Implement the getValue method to return the value of the input
     */
    getValue: () => "",
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
