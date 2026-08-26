<script lang="ts">
  import type { OreComponentProps } from "../types.js";

  export type ProgressRingProps = OreComponentProps<HTMLSpanElement>;

  let { children, class: className, ...props }: ProgressRingProps = $props();
  let element: HTMLSpanElement;

  export function getElement(): HTMLSpanElement {
    return element;
  }
</script>

<span bind:this={element} class={`ore-progress-ring ${className ?? ""}`} {...props}>
  {@render children?.()}
</span>