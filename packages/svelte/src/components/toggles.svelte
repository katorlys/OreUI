<script lang="ts">
  import "oreui-web/toggles";
  import type { OreToggles } from "oreui-web/toggles";
  import type { OreComponentProps } from "../types.js";

  export type TogglesProps = OreComponentProps<OreToggles>;

  let { children, ...props }: TogglesProps = $props();
  let element: OreToggles;

  export function getElement(): OreToggles {
    return element;
  }
</script>

<ore-toggles bind:this={element} {...props}>
  {@render children?.()}
</ore-toggles>