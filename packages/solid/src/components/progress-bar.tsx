import { splitProps, type JSX } from "solid-js";

export type ProgressBarProps = JSX.ProgressHTMLAttributes<HTMLProgressElement>;

export function ProgressBar(props: ProgressBarProps): JSX.Element {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <progress
      {...rest}
      class={`ore-progress-bar ${local.class ?? ""}`}
    />
  );
}
