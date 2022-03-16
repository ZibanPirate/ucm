import type { FC } from "react";

export const Container: FC = ({ children }) => (
  <div style={{ maxWidth: 1200, margin: "auto" }}>{children}</div>
);
