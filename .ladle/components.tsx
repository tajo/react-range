import type { GlobalProvider } from "@ladle/react";
import * as React from "react";

export const Provider: GlobalProvider = ({ children, globalState }) => {
  if (globalState.mode === "preview") {
    return (
      <div
        style={{
          margin: "8px",
          marginTop: "60px",
          marginLeft: "30px",
          marginRight: "30px",
        }}
      >
        {children}
      </div>
    );
  }
  return children;
};

export const args = {
  rtl: false,
};
