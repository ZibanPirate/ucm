import type { FC } from "React";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

const buttonSizeToHTMLFontSizeMap: Record<ButtonSize, string> = {
  xs: "x-small",
  sm: "small",
  md: "medium",
  lg: "large",
  xl: "x-large",
};

export const Button: FC<{ size?: ButtonSize; stretch?: boolean; onClick?: () => void }> = ({
  children,
  size = "md",
  stretch = false,
  onClick = () => null,
}) => {
  return (
    <button
      className="ucm-ui-button"
      style={{
        fontSize: buttonSizeToHTMLFontSizeMap[size],
        ...(stretch ? { flex: "1" } : {}),
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
