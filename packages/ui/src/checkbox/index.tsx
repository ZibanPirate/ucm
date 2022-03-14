import type { FC } from "react";

export const CheckBox: FC<{
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}> = ({ label, checked = false, onChange = () => null }) => {
  return (
    <div>
      <input
        id={label}
        name={label}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};
