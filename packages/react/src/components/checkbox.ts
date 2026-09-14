import React from "react";

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "color" | "type"
> & {
  color?: string;
  labelClassName?: string;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { children, color, labelClassName, className, ...props },
    ref,
  ): React.ReactElement {
    return React.createElement(
      "label",
      { className: labelClassName },
      React.createElement("input", {
        ...props,
        className: className ? `ore-checkbox ${className}` : "ore-checkbox",
        "data-color": color,
        ref,
        type: "checkbox",
      }),
      children,
    );
  },
);
