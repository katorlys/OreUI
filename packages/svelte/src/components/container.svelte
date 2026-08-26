<script lang="ts">
  import type { OreContainerVariant } from "oreui-web/container";
  import type { OreComponentProps } from "../types.js";

  export type ContainerProps = OreComponentProps<HTMLDivElement> & {
    variant?: OreContainerVariant;
  };

  let { children, variant = "dark", class: className, ...props }: ContainerProps = $props();
  let element: HTMLDivElement;

  export function getElement(): HTMLDivElement {
    return element;
  }
</script>

<div bind:this={element} class={`ore-container ${className ?? ""}`} data-variant={variant} {...props}>
  {@render children?.()}
</div>