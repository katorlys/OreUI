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
    { children, color, labelClassName, ...props },
    ref,
  ): React.ReactElement {
    return React.createElement(
      "label",
      { className: labelClassName },
      React.createElement("input", {
        ...props,
        "data-color": color,
        ref,
        type: "checkbox",
      }),
      children,
    );
  },
);
