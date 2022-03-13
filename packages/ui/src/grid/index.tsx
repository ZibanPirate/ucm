import type { FC } from "React";

export const Grid: FC = ({ children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      flex: "1",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "1rem",
      margin: "auto",
    }}
  >
    {children}
  </div>
);