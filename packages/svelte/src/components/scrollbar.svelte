<script lang="ts">
  import "oreui-web/scrollbar";
  import type { OreScrollbar } from "oreui-web/scrollbar";
  import type { OreComponentProps } from "../types.js";

  export type ScrollbarProps = OreComponentProps<OreScrollbar>;

  let { children, ...props }: ScrollbarProps = $props();
  let element: OreScrollbar;

  export function getElement(): OreScrollbar {
    return element;
  }
</script>

<ore-scrollbar bind:this={element} {...props}>
  {@render children?.()}
</ore-scrollbar>