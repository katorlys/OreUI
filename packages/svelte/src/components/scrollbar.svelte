<script lang="ts">
  import "oreui-web/scrollbar";
  import type { OreComponentProps } from "../types.js";

  export type ScrollbarProps = OreComponentProps<HTMLDivElement>;

  let { children, class: className, ...props }: ScrollbarProps = $props();
  let element: HTMLDivElement;

  export function getElement(): HTMLDivElement {
    return element;
  }
</script>

<div bind:this={element} class={`ore-scrollbar ${className ?? ""}`} {...props}>
  {@render children?.()}
</div>