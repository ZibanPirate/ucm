import type { FC } from "react";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

const buttonSizeToHTMLFontSizeMap: Record<ButtonSize, string> = {
  xs: "x-small",
  sm: "small",
  md: "medium",
  lg: "large",
  xl: "x-large",
};

export const Button: FC<{
  size?: ButtonSize;
  stretch?: boolean;
  onClick?: () => void;
  margin?: string;
}> = ({
  children,
  size = "md",
  stretch = false,
  onClick = () => null,
  margin = "initial",
  ...props
}) => {
  const button = (
    <button
      className="ucm-ui-button"
      style={{
        fontSize: buttonSizeToHTMLFontSizeMap[size],
        ...(stretch ? { flex: "1" } : {}),
        margin,
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
  return button;
};
