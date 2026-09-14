import "oreui-web/dropdown";

import type {
  OreDropdownChangeDetail,
  OreDropdownVariant,
} from "oreui-web/dropdown";
import { onCleanup, onMount, splitProps, type JSX } from "solid-js";

export type DropdownProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  "onChange"
> & {
  onChange?: (event: CustomEvent<OreDropdownChangeDetail>) => void;
  onValueChange?: (value: string) => void;
  value?: string;
  variant?: OreDropdownVariant;
};

export function Dropdown(props: DropdownProps): JSX.Element {
  const [local, rest] = splitProps(props, [
    "class",
    "onChange",
    "onValueChange",
    "ref",
    "value",
    "variant",
  ]);
  let element: HTMLDivElement | undefined;

  onMount(() => {
    if (!element) {
      return;
    }

    const listener = (event: Event) => {
      const changeEvent = event as CustomEvent<OreDropdownChangeDetail>;
      local.onChange?.(changeEvent);
      local.onValueChange?.(changeEvent.detail.value);
    };
    element.addEventListener("change", listener);
    onCleanup(() => element?.removeEventListener("change", listener));
  });

  return (
    <div
      {...rest}
      class={`ore-dropdown ${local.class ?? ""}`}
      data-value={local.value}
      data-variant={local.variant ?? "borderless"}
      ref={(value) => {
        element = value;
        if (typeof local.ref === "function") {
          local.ref(value);
        }
      }}
    />
  );
}
