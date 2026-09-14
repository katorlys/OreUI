import type { JSX } from "solid-js";

export type TogglesProps = JSX.HTMLAttributes<HTMLDivElement>;

export function Toggles(props: TogglesProps): JSX.Element {
  return <div {...props} class="ore-toggles" role="tablist" />;
}
