<script lang="ts">
  import "oreui-web/table";
  import type {
    OreTableSortDetail,
    OreTableVariant,
  } from "oreui-web/table";
  import type { OreComponentProps } from "../types.js";

  export type TableProps = OreComponentProps<HTMLDivElement> & {
    variant?: OreTableVariant;
    onSort?: (event: CustomEvent<OreTableSortDetail>) => void;
  };

  let { children, class: className, onSort, variant, ...props }: TableProps = $props();
  let element: HTMLDivElement;

  export function getElement(): HTMLDivElement {
    return element;
  }
</script>

<div
  bind:this={element}
  class={`ore-table ore-scrollbar ${className ?? ""}`}
  data-variant={variant}
  onsort={onSort}
  {...props}
>
  {@render children?.()}
</div>