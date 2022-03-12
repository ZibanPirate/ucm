import type { FC } from "React";

type TextSize = "xs" | "sm" | "md" | "lg" | "xl";

const textSizeToHTMLFontSizeMap: Record<TextSize, string> = {
  xs: "x-small",
  sm: "small",
  md: "medium",
  lg: "large",
  xl: "x-large",
};

export const Text: FC<{ size?: TextSize }> = ({ children, size = "md" }) => {
  return <span style={{ fontSize: textSizeToHTMLFontSizeMap[size] }}>{children}</span>;
};
