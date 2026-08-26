<script lang="ts">
  import type { OreComponentProps } from "../types.js";

  export type NavbarProps = OreComponentProps<HTMLElement>;

  let { children, class: className, ...props }: NavbarProps = $props();
  let element: HTMLElement;

  export function getElement(): HTMLElement {
    return element;
  }
</script>

<nav bind:this={element} class={`ore-navbar ${className ?? ""}`} {...props}>
  {@render children?.()}
</nav>