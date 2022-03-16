import { FC, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const NumberInput: FC<{
  label?: string;
  value: number;
  onChange?: (value: number) => void;
  margin?: string;
  debounce?: number;
}> = ({ label = "", value, onChange = () => null, margin = "initial", debounce = 0, ...props }) => {
  const [localValue, setLocalValue] = useState(value);
  useEffect(() => setLocalValue(value), [value]);
  const debouncedOnChange = useDebouncedCallback(onChange, debounce);
  return (
    <div>
      <input
        id={label}
        name={label}
        type="number"
        onChange={(e) => {
          const number = Number(e.target.value);
          setLocalValue(number);
          debouncedOnChange(number);
        }}
        value={localValue}
        style={{ margin }}
        {...props}
      />
      <label style={{ margin: "0.3rem" }} htmlFor={label}>
        {label}
      </label>
    </div>
  );
};
