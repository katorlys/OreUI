import "oreui-web/table";

import type {
  OreTableSortDetail,
  OreTableVariant,
} from "oreui-web/table";
import { onCleanup, onMount, splitProps, type JSX } from "solid-js";

export type TableProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "onSort"> & {
  onSort?: (event: CustomEvent<OreTableSortDetail>) => void;
  variant?: OreTableVariant;
};

export function Table(props: TableProps): JSX.Element {
  const [local, rest] = splitProps(props, ["class", "onSort", "ref", "variant"]);
  let element: HTMLDivElement | undefined;

  onMount(() => {
    if (!element || !local.onSort) {
      return;
    }

    const listener = (event: Event) =>
      local.onSort?.(event as CustomEvent<OreTableSortDetail>);
    element.addEventListener("sort", listener);
    onCleanup(() => element?.removeEventListener("sort", listener));
  });

  return (
    <div
      {...rest}
      class={`ore-table ore-scrollbar ${local.class ?? ""}`}
      data-variant={local.variant}
      ref={(value) => {
        element = value;
        if (typeof local.ref === "function") {
          local.ref(value);
        }
      }}
    />
  );
}
