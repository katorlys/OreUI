<script lang="ts">
  import "oreui-web/progress-ring";
  import type { OreProgressRing } from "oreui-web/progress-ring";
  import type { OreComponentProps } from "../types.js";

  export type ProgressRingProps = OreComponentProps<
    OreProgressRing,
    "max" | "value"
  >;

  let { children, ...props }: ProgressRingProps = $props();
  let element: OreProgressRing;

  export function getElement(): OreProgressRing {
    return element;
  }
</script>

<ore-progress-ring bind:this={element} {...props}>
  {@render children?.()}
</ore-progress-ring>