import React from "react";

export { TabButton, type TabButtonProps } from "./tab-button.js";

export type TogglesProps = React.HTMLAttributes<HTMLDivElement>;

export const Toggles = React.forwardRef<HTMLDivElement, TogglesProps>(
  function Toggles({ children, className, ...props }, ref) {
    return React.createElement(
      "div",
      {
        ...props,
        className: className ? `ore-toggles ${className}` : "ore-toggles",
        ref,
        role: "tablist",
      },
      children,
    );
  },
);
