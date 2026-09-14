<script lang="ts">
  import type { OreComponentProps } from "../types.js";

  export type SpinnerProps = OreComponentProps<HTMLSpanElement>;

  let { children, class: className, "aria-hidden": ariaHidden, "aria-label": ariaLabel, ...props }: SpinnerProps = $props();
  let element: HTMLSpanElement;

  export function getElement(): HTMLSpanElement {
    return element;
  }
</script>

<span
  bind:this={element}
  class={`ore-spinner ${className ?? ""}`}
  role={ariaHidden ? undefined : "status"}
  aria-hidden={ariaHidden}
  aria-label={ariaHidden ? undefined : (ariaLabel ?? "Loading")}
  {...props}
>
  {@render children?.()}
</span>