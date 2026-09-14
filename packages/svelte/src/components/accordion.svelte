<script lang="ts">
  import type { OreComponentProps } from "../types.js";

  export type AccordionProps = OreComponentProps<HTMLDetailsElement>;

  let { children, class: className, ...props }: AccordionProps = $props();
  let element: HTMLDetailsElement;

  export function getElement(): HTMLDetailsElement {
    return element;
  }
</script>

<details bind:this={element} class={`ore-accordion ${className ?? ""}`} {...props}>
  {@render children?.()}
</details>