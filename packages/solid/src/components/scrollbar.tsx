import "oreui-web/scrollbar";
import { splitProps, type JSX } from "solid-js";

export type ScrollbarProps = JSX.HTMLAttributes<HTMLDivElement>;

export function Scrollbar(props: ScrollbarProps): JSX.Element {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      {...rest}
      class={`ore-scrollbar ${local.class ?? ""}`}
    />
  );
}
