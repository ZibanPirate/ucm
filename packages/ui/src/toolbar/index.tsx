import type { FC } from "react";

type ToolbarItemsAlignment =
  | "start"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "end";

const toolbarItemsAlignmentTo: Record<ToolbarItemsAlignment, string> = {
  start: "start",
  center: "center",
  "space-between": "space-between",
  "space-around": "space-around",
  "space-evenly": "space-evenly",
  end: "end",
};

export const Toolbar: FC<{ itemsAlignment?: ToolbarItemsAlignment; margin?: string }> = ({
  children,
  itemsAlignment = "start",
  margin = "initial",
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flex: "1",
        margin,
        justifyContent: toolbarItemsAlignmentTo[itemsAlignment],
      }}
    >
      {children}
    </div>
  );
};
