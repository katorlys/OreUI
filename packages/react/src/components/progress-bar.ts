import React from "react";

export type ProgressBarProps = React.ProgressHTMLAttributes<HTMLProgressElement>;

export const ProgressBar = React.forwardRef<
  HTMLProgressElement,
  ProgressBarProps
>(function ProgressBar(props, ref) {
  return React.createElement("progress", {
    ...props,
    ref,
    className: props.className
      ? `ore-progress-bar ${props.className}`
      : "ore-progress-bar",
  });
});
