<script lang="ts">
  import "oreui-web/spinner";
  import type { OreSpinner } from "oreui-web/spinner";
  import type { OreComponentProps } from "../types.js";

  export type SpinnerProps = OreComponentProps<OreSpinner>;

  let { children, ...props }: SpinnerProps = $props();
  let element: OreSpinner;

  export function getElement(): OreSpinner {
    return element;
  }
</script>

<ore-spinner bind:this={element} {...props}>
  {@render children?.()}
</ore-spinner>