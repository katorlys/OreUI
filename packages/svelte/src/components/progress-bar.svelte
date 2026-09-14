<script lang="ts">
  import type { OreComponentProps } from "../types.js";

  export type ProgressBarProps = OreComponentProps<HTMLProgressElement>;

  let { children, class: className, ...props }: ProgressBarProps = $props();
  let element: HTMLProgressElement;

  export function getElement(): HTMLProgressElement {
    return element;
  }
</script>

<progress bind:this={element} class={`ore-progress-bar ${className ?? ""}`} {...props}>
  {@render children?.()}
</progress>