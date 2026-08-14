<script lang="ts">
  import "oreui-web/container";
  import type { OreContainer, OreContainerVariant } from "oreui-web/container";
  import type { OreComponentProps } from "../types.js";

  export type ContainerProps = OreComponentProps<OreContainer, "variant"> & {
    variant?: OreContainerVariant;
  };

  let { children, ...props }: ContainerProps = $props();
  let element: OreContainer;

  export function getElement(): OreContainer {
    return element;
  }
</script>

<ore-container bind:this={element} {...props}>
  {@render children?.()}
</ore-container>