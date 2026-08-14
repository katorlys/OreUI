<script lang="ts">
  import "oreui-web/divider";
  import type { OreDivider } from "oreui-web/divider";
  import type { OreComponentProps } from "../types.js";

  export type DividerProps = OreComponentProps<OreDivider>;

  let { children, ...props }: DividerProps = $props();
  let element: OreDivider;

  export function getElement(): OreDivider {
    return element;
  }
</script>

<ore-divider bind:this={element} {...props}>
  {@render children?.()}
</ore-divider>