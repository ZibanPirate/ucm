import type { FC } from "React";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

const buttonSizeToHTMLFontSizeMap: Record<ButtonSize, string> = {
  xs: "x-small",
  sm: "small",
  md: "medium",
  lg: "large",
  xl: "x-large",
};

export const Button: FC<{ size?: ButtonSize; stretch?: boolean }> = ({
  children,
  size = "md",
  stretch = false,
}) => {
  return (
    <button
      className="ucm-ui-button"
      style={{
        fontSize: buttonSizeToHTMLFontSizeMap[size],
        ...(stretch ? { flex: "1" } : {}),
      }}
    >
      {children}
    </button>
  );
};
