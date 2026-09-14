import React from "react";

export type RadioProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "color" | "type"
> & {
  color?: string;
  labelClassName?: string;
};

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  function Radio(
    { children, color, labelClassName, className, ...props },
    ref,
  ): React.ReactElement {
    return React.createElement(
      "label",
      { className: labelClassName },
      React.createElement("input", {
        ...props,
        className: className ? `ore-radio ${className}` : "ore-radio",
        "data-color": color,
        ref,
        type: "radio",
      }),
      children,
    );
  },
);
