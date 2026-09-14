import type { JSX } from "solid-js";

export type NavbarProps = JSX.HTMLAttributes<HTMLElement>;

export function Navbar(props: NavbarProps): JSX.Element {
  const { class: className, ...rest } = props;

  return <nav {...rest} class={`ore-navbar ${className ?? ""}`} />;
}
