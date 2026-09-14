<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLSelectAttributes } from "svelte/elements";

  export type SelectProps = Omit<HTMLSelectAttributes, "children" | "value"> & {
    children?: Snippet;
    value?: string;
    onChange?: (event: Event) => void;
  };

  let {
    children,
    class: className,
    value = $bindable(""),
    onChange,
    ...props
  }: SelectProps = $props();
  let element: HTMLSelectElement;

  function handleChange(event: Event): void {
    value = element.value;
    onChange?.(event);
  }

  export function getElement(): HTMLSelectElement {
    return element;
  }
</script>

<select bind:this={element} bind:value class="ore-select {className ?? ''}" onchange={handleChange} {...props}>
  {@render children?.()}
</select>