import type { FC } from "react";

export const Container: FC = ({ children }) => (
  <div style={{ maxWidth: 900, margin: "auto" }}>{children}</div>
);
