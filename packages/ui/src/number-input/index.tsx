import type { FC } from "react";

export const NumberInput: FC<{
  label?: string;
  value: number;
  onChange?: (value: number) => void;
}> = ({ label = "", value, onChange = () => null, ...props }) => {
  return (
    <div>
      <input
        id={label}
        name={label}
        type="number"
        onChange={(e) => onChange(Number(e.target.value))}
        value={value}
        {...props}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};
