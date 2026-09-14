import React from "react";

export type ProgressRingProps = React.HTMLAttributes<HTMLSpanElement>;

export const ProgressRing = React.forwardRef<
  HTMLSpanElement,
  ProgressRingProps
>(function ProgressRing(props, ref) {
  return React.createElement("span", {
    ...props,
    ref,
    className: props.className
      ? `ore-progress-ring ${props.className}`
      : "ore-progress-ring",
  });
});
