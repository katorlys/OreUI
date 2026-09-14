import type { JSX } from "solid-js";

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: string;
  loading?: boolean;
  variant?: string;
};

export function Button(props: ButtonProps): JSX.Element {
  const dataProps = {
    "data-color": props.color,
    "data-loading": props.loading ? "" : undefined,
    "data-variant": props.variant,
  };

  return (
    <button
      {...props}
      class={`ore-button ${props.class ?? ""}`}
      {...dataProps}
      aria-busy={props.loading || undefined}
      disabled={props.disabled || props.loading}
    />
  );
}
