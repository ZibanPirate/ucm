import type { FC } from "react";

export const Grid: FC<{ margin?: string }> = ({ children, margin = "auto" }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      flex: "1",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "1rem",
      height: "fit-content",
      margin,
    }}
  >
    {children}
  </div>
);
