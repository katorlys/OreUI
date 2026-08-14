<script lang="ts">
  import "oreui-web/tab-bar";
  import type { OreTabBar } from "oreui-web/tab-bar";
  import type { OreComponentProps } from "../types.js";

  export type TabBarProps = OreComponentProps<OreTabBar>;

  let { children, ...props }: TabBarProps = $props();
  let element: OreTabBar;

  export function getElement(): OreTabBar {
    return element;
  }
</script>

<ore-tab-bar bind:this={element} {...props}>
  {@render children?.()}
</ore-tab-bar>