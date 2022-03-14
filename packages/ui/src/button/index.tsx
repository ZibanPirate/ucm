import Link from "next/link";
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
  link?: string;
  margin?: string;
}> = ({
  children,
  size = "md",
  stretch = false,
  onClick = () => null,
  link,
  margin = "initial",
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
    >
      {children}
    </button>
  );
  if (link) {
    return (
      <Link href={link} shallow={true} scroll={false}>
        {button}
      </Link>
    );
  }
  return button;
};
