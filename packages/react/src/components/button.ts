import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: string;
  loading?: boolean;
  variant?: string;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { color, loading, variant, children, ...props },
    ref,
  ): React.ReactElement {
    return React.createElement(
      "button",
      {
        ...props,
        "aria-busy": loading || undefined,
        "data-color": color,
        "data-loading": loading ? "" : undefined,
        "data-variant": variant,
        disabled: props.disabled || loading,
        ref,
      },
      children,
    );
  },
);
