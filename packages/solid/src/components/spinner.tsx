import { splitProps, type JSX } from "solid-js";

export type SpinnerProps = JSX.HTMLAttributes<HTMLSpanElement>;

export function Spinner(props: SpinnerProps): JSX.Element {
  const [local, rest] = splitProps(props, [
    "class",
    "aria-hidden",
    "aria-label",
  ]);

  return (
    <span
      {...rest}
      class={`ore-spinner ${local.class ?? ""}`}
      role={local["aria-hidden"] ? undefined : "status"}
      aria-hidden={local["aria-hidden"]}
      aria-label={
        local["aria-hidden"] ? undefined : (local["aria-label"] ?? "Loading")
      }
    />
  );
}
