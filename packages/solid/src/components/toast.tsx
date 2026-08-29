import "oreui-web/toast";

import type { OreToastPosition, OreToastVariant } from "oreui-web/toast";
import { onCleanup, onMount, splitProps, type JSX } from "solid-js";

export type ToastProps = JSX.HTMLAttributes<HTMLDivElement> & {
  defaultOpen?: boolean;
  duration?: number;
  onOpenChange?: (event: CustomEvent<boolean>) => void;
  open?: boolean;
  position?: OreToastPosition;
  variant?: OreToastVariant;
};

export function Toast(props: ToastProps): JSX.Element {
  const [local, rest] = splitProps(props, [
    "class",
    "defaultOpen",
    "duration",
    "onOpenChange",
    "open",
    "position",
    "ref",
    "variant",
  ]);
  let element: HTMLDivElement | undefined;

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
    <div
      {...rest}
      class={`ore-toast ${local.class ?? ""}`}
      data-default-open={local.defaultOpen ? "" : undefined}
      data-duration={local.duration}
      data-open={local.open ? "" : undefined}
      data-position={local.position ?? "bottom-center"}
      data-variant={local.variant ?? "neutral"}
      ref={(value) => {
        element = value;
        if (typeof local.ref === "function") {
          local.ref(value);
        }
      }}
    />
  );
}
