import React from "react";

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ children, ...props }, ref) {
    return React.createElement(
      "button",
      {
        ...props,
        className: props.className
          ? `ore-icon-button ${props.className}`
          : "ore-icon-button",
        ref,
      },
      children,
    );
  },
);
