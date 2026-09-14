<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  export type IconButtonProps = HTMLButtonAttributes;

  let { children, class: className, ...props }: IconButtonProps = $props();
  let element: HTMLButtonElement;

  export function getElement(): HTMLButtonElement {
    return element;
  }
</script>

<button bind:this={element} class={`ore-icon-button ${className ?? ""}`} {...props}>
  {@render children?.()}
</button>