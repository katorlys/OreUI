import "oreui-web/scrollbar";
import React from "react";

export type ScrollbarProps = React.HTMLAttributes<HTMLDivElement>;

export const Scrollbar = React.forwardRef<HTMLDivElement, ScrollbarProps>(
  function Scrollbar(props, ref) {
    return React.createElement("div", {
      ...props,
      ref,
      className: props.className
        ? `ore-scrollbar ${props.className}`
        : "ore-scrollbar",
    });
  },
);
