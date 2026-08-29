import "oreui-web/tooltip";

import type { OreTooltipSide } from "oreui-web/tooltip";
import { onCleanup, onMount, splitProps, type JSX } from "solid-js";

export type TooltipProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  defaultOpen?: boolean;
  delay?: number;
  onOpenChange?: (event: CustomEvent<boolean>) => void;
  open?: boolean;
  side?: OreTooltipSide;
};

export function Tooltip(props: TooltipProps): JSX.Element {
  const [local, rest] = splitProps(props, [
    "class",
    "defaultOpen",
    "delay",
    "onOpenChange",
    "open",
    "ref",
    "side",
  ]);
  let element: HTMLSpanElement | undefined;

  onMount(() => {
    if (!element) {
      return;
    }

    const listener = (event: Event): void => {
      local.onOpenChange?.(event as CustomEvent<boolean>);
    };
    element.addEventListener("oreui:openchange", listener);
    onCleanup(() => element?.removeEventListener("oreui:openchange", listener));
  });

  return (
    <span
      {...rest}
      class={`ore-tooltip ${local.class ?? ""}`}
      data-default-open={local.defaultOpen ? "" : undefined}
      data-delay={local.delay}
      data-open={local.open === undefined ? undefined : String(local.open)}
      data-side={local.side ?? "top"}
      ref={(value) => {
        element = value;
        if (typeof local.ref === "function") {
          local.ref(value);
        }
      }}
    />
  );
}
