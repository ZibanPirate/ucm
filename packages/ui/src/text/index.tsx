import type { FC } from "React";

type TextSize = "xs" | "sm" | "md" | "lg" | "xl";

const textSizeToHTMLFontSizeMap: Record<TextSize, string> = {
  xs: "x-small",
  sm: "small",
  md: "medium",
  lg: "large",
  xl: "x-large",
};

export const Text: FC<{ size?: TextSize; margin?: string; stretch?: boolean }> = ({
  children,
  size = "md",
  margin = "initial",
  stretch = false,
}) => {
  return (
    <span
      style={{
        fontSize: textSizeToHTMLFontSizeMap[size],
        margin,
        display: "flex",
        ...(stretch ? { flex: "1" } : {}),
      }}
    >
      {children}
    </span>
  );
};
