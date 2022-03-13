import type { FC } from "React";

export const Container: FC = ({ children }) => (
  <div style={{ maxWidth: 900, margin: "auto" }}>{children}</div>
);
