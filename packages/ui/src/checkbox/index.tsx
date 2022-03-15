import type { FC } from "react";

export const CheckBox: FC<{
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}> = ({ label = "", checked = false, onChange = () => null, ...props }) => {
  return (
    <div>
      <input
        id={label}
        name={label}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        {...props}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};
