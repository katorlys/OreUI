<script lang="ts">
  import "oreui-web/table";
  import type {
    OreTableSortDetail,
    OreTableVariant,
  } from "oreui-web/table";
  import { onMount } from "svelte";
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

  onMount(() => {
    const listener = (event: Event): void => {
      onSort?.(event as CustomEvent<OreTableSortDetail>);
    };

    element.addEventListener("sort", listener);
    return () => element.removeEventListener("sort", listener);
  });
</script>

<div
  bind:this={element}
  class={`ore-table ore-scrollbar ${className ?? ""}`}
  data-variant={variant}
  {...props}
>
  {@render children?.()}
</div>