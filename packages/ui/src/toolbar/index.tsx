import type { FC } from "React";

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

export const Toolbar: FC<{ itemsAlignment?: ToolbarItemsAlignment }> = ({
  children,
  itemsAlignment = "start",
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flex: "1",
        justifyContent: toolbarItemsAlignmentTo[itemsAlignment],
      }}
    >
      {children}
    </div>
  );
};
