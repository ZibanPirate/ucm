import type { FC } from "react";

export const Popup: FC<{ shown: boolean; onClose?: () => void }> = ({
  children,
  shown = false,
  onClose = () => null,
}) => {
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
    >
      <div
        style={{
          textAlign: "start",
          display: "inline-block",
          backgroundColor: "lightgray",
          margin: "3rem",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
