import type { JSX } from "solid-js";

export type AccordionProps = JSX.HTMLAttributes<HTMLDetailsElement>;

export function Accordion(props: AccordionProps): JSX.Element {
  const { class: className, ...rest } = props;

  return <details {...rest} class={`ore-accordion ${className ?? ""}`} />;
}
