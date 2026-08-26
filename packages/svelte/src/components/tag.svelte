<script lang="ts">
  import type { OreComponentProps } from "../types.js";

  export type TagProps = OreComponentProps<HTMLSpanElement> & {
    variant?: string;
    outlined?: boolean;
  };

  let { children, variant, outlined, class: className, ...props }: TagProps = $props();
  let element: HTMLSpanElement;

  export function getElement(): HTMLSpanElement {
    return element;
  }
</script>

<span bind:this={element} class={`ore-tag ${className ?? ""}`} data-variant={variant} data-outlined={outlined ? "" : undefined} {...props}>
  {@render children?.()}
</span>