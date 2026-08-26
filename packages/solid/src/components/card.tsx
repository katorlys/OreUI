import type { JSX } from "solid-js";

export type CardProps = JSX.HTMLAttributes<HTMLElement>;

export function Card(props: CardProps): JSX.Element {
  const { class: className, ...rest } = props;

  return <article {...rest} class={`ore-card ${className ?? ""}`} />;
}
