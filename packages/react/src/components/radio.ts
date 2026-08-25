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
        type: "radio",
      }),
      children,
    );
  },
);
