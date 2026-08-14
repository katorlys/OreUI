<script lang="ts">
  import "oreui-web/table";
  import type {
    OreTable,
    OreTableSortDetail,
    OreTableVariant,
  } from "oreui-web/table";
  import type { OreComponentProps } from "../types.js";

  export type TableProps = OreComponentProps<OreTable, "variant"> & {
    variant?: OreTableVariant;
    onSort?: (event: CustomEvent<OreTableSortDetail>) => void;
  };

  let { children, onSort, ...props }: TableProps = $props();
  let element: OreTable;

  export function getElement(): OreTable {
    return element;
  }
</script>

<ore-table bind:this={element} onsort={onSort} {...props}>
  {@render children?.()}
</ore-table>