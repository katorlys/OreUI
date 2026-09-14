import React from "react";

export type SwitchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "color" | "type"
> & {
  color?: string;
  labelClassName?: string;
  variant?: string;
};

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(
    { children, color, labelClassName, className, variant, ...props },
    ref,
  ): React.ReactElement {
    return React.createElement(
      "label",
      { className: labelClassName },
      React.createElement("input", {
        ...props,
        className: className ? `ore-switch ${className}` : "ore-switch",
        "data-color": color,
        "data-variant": variant,
        ref,
        role: "switch",
        type: "checkbox",
      }),
      children,
    );
  },
);
