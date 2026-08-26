import { splitProps, type JSX } from "solid-js";

export type ProgressRingProps = JSX.HTMLAttributes<HTMLSpanElement>;

export function ProgressRing(props: ProgressRingProps): JSX.Element {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <span
      {...rest}
      class={`ore-progress-ring ${local.class ?? ""}`}
    />
  );
}
