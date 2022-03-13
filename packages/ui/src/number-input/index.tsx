import type { FC } from "React";

export const NumberInput: FC<{
  label?: string;
  value: number;
  onChange?: (value: string) => void;
}> = ({ label = "", value, onChange = () => null }) => {
  return (
    <div>
      <input
        id={label}
        name={label}
        type="number"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};
