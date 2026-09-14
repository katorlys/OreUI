<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLFieldsetAttributes } from "svelte/elements";

  export type RadioGroupProps = Omit<HTMLFieldsetAttributes, "children"> & {
    children?: Snippet;
  };

  let { children, class: className, ...props }: RadioGroupProps = $props();
  let element: HTMLFieldSetElement;

  export function getElement(): HTMLFieldSetElement {
    return element;
  }
</script>

<fieldset bind:this={element} {...props} class={["ore-radio-group", className]}>
  {@render children?.()}
</fieldset>