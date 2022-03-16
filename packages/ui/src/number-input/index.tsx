import type { FC } from "react";

export const NumberInput: FC<{
  label?: string;
  value: number;
  onChange?: (value: number) => void;
  margin?: string;
}> = ({ label = "", value, onChange = () => null, margin = "initial", ...props }) => {
  return (
    <div>
      <input
        id={label}
        name={label}
        type="number"
        onChange={(e) => onChange(Number(e.target.value))}
        value={value}
        style={{ margin }}
        {...props}
      />
      <label style={{ margin: "0.3rem" }} htmlFor={label}>
        {label}
      </label>
    </div>
  );
};
