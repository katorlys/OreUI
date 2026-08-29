import React from "react";

export type TabButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  palette?: "default" | "toggle";
  selected?: boolean;
  variant?: string;
};

export const TabButton = React.forwardRef<HTMLButtonElement, TabButtonProps>(
  function TabButton({ palette, selected, variant, className, ...props }, ref) {
    return React.createElement("button", {
      ...props,
      "aria-selected": selected,
      className: className ? `ore-tab-button ${className}` : "ore-tab-button",
      "data-palette": palette,
      "data-variant": variant,
      ref,
      role: "tab",
    });
  },
);
