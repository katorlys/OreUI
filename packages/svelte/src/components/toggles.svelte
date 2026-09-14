<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { OreComponentProps } from "../types.js";

  export type TogglesProps = HTMLAttributes<HTMLDivElement>;

  let { children, ...props }: TogglesProps = $props();
  let element: HTMLDivElement;

  export function getElement(): HTMLDivElement {
    return element;
  }
</script>

<div class="ore-toggles" bind:this={element} role="tablist" {...props}>
  {@render children?.()}
</div>