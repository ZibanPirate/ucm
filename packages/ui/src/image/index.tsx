import type { FC } from "react";

type ImageSize = "xs" | "sm" | "md" | "lg" | "xl" | "auto";

export const imageSizeToStyle: Record<ImageSize, number> = {
  xs: 50,
  sm: 100,
  md: 200,
  lg: 300,
  xl: 400,
  auto: 600,
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
        ...(ratio && size !== "auto"
          ? { width: imageSizeToStyle[size], height: imageSizeToStyle[size] / ratio }
          : {}),
        objectFit: "cover",
        ...(size === "auto" ? { width: "100%" } : {}),
      }}
    />
  );
};
