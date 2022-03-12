import type { FC } from "React";

type ImageSize = "xs" | "sm" | "md" | "lg" | "xl";

export const imageSizeToStyle: Record<ImageSize, number> = {
  xs: 50,
  sm: 100,
  md: 200,
  lg: 300,
  xl: 400,
};

export const Image: FC<{ url: string; size?: ImageSize; ratio?: number }> = ({
  url,
  size = "md",
  ratio = 1,
}) => {
  return (
    <img
      src={url}
      style={{
        width: imageSizeToStyle[size],
        height: imageSizeToStyle[size] / ratio,
      }}
    />
  );
};
