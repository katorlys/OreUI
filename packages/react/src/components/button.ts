import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: string;
  loading?: boolean;
  variant?: string;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { color, loading, variant, children, className, ...props },
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
        className: className ? `ore-button ${className}` : "ore-button",
        disabled: props.disabled || loading,
        ref,
      },
      children,
    );
  },
);
