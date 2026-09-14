import type { JSX } from "solid-js";

export type DividerProps = JSX.HTMLAttributes<HTMLHRElement>;

export function Divider(props: DividerProps): JSX.Element {
  return <hr {...props} class="ore-divider" />;
}
