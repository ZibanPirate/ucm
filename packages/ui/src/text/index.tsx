import type { FC } from "React";

type TextSize = "xs" | "sm" | "md" | "lg" | "xl";

const textSizeToHTMLFontSizeMap: Record<TextSize, string> = {
  xs: "x-small",
  sm: "small",
  md: "medium",
  lg: "large",
  xl: "x-large",
};

export const Text: FC<{ size?: TextSize; margin?: number }> = ({
  children,
  size = "md",
  margin = 0,
}) => {
  return (
    <span
      style={{
        fontSize: textSizeToHTMLFontSizeMap[size],
        margin: `${margin / 3}rem`,
      }}
    >
      {children}
    </span>
  );
};
