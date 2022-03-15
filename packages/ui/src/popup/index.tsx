import type { FC } from "react";

export const Popup: FC<{
  shown: boolean;
  onClose: () => void;
  containerProps?: Record<string, unknown>;
}> = ({ children, shown, onClose, containerProps = {}, ...props }) => {
  return (
    <div
      style={{
        display: shown ? "initial" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#fffe",
        overflow: "auto",
        textAlign: "center",
      }}
      onClick={onClose}
      {...containerProps}
    >
      <div
        style={{
          textAlign: "start",
          display: "inline-block",
          backgroundColor: "lightgray",
          margin: "3rem",
        }}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};
