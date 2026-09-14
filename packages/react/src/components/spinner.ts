import React from "react";

export type SpinnerProps = React.HTMLAttributes<HTMLSpanElement>;

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner(
    { "aria-hidden": ariaHidden, "aria-label": ariaLabel, ...props },
    ref,
  ) {
    return React.createElement("span", {
      ...props,
      ref,
      className: props.className
        ? `ore-spinner ${props.className}`
        : "ore-spinner",
      role: ariaHidden ? undefined : "status",
      "aria-hidden": ariaHidden,
      "aria-label": ariaHidden ? undefined : (ariaLabel ?? "Loading"),
    });
  },
);
