<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";

  export type RadioProps = Omit<HTMLInputAttributes, "children" | "color" | "type"> & {
    children?: Snippet;
    color?: string;
    labelClass?: string;
  };

  let {
    children,
    class: className,
    color,
    labelClass,
    ...props
  }: RadioProps = $props();
  let element: HTMLInputElement;

  export function getElement(): HTMLInputElement {
    return element;
  }
</script>

<label class={labelClass}>
  <input bind:this={element} {...props} class="ore-radio {className ?? ''}" data-color={color} type="radio" />
  {@render children?.()}
</label>