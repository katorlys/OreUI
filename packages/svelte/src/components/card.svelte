<script lang="ts">
  import type { OreComponentProps } from "../types.js";

  export type CardProps = OreComponentProps<HTMLElement>;

  let { children, class: className, ...props }: CardProps = $props();
  let element: HTMLElement;

  export function getElement(): HTMLElement {
    return element;
  }
</script>

<article bind:this={element} class={`ore-card ${className ?? ""}`} {...props}>
  {@render children?.()}
</article>