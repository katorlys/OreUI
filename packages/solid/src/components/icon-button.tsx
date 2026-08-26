import type { JSX } from "solid-js";

export type IconButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton(props: IconButtonProps): JSX.Element {
  const { class: className, ...rest } = props;

  return <button {...rest} class={`ore-icon-button ${className ?? ""}`} />;
}
