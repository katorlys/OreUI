<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";

  export type CheckboxProps = Omit<HTMLInputAttributes, "children" | "color" | "type"> & {
    checked?: boolean;
    children?: Snippet;
    color?: string;
    labelClass?: string;
  };

  let {
    children,
    checked = $bindable(false),
    class: className,
    color,
    labelClass,
    oninput,
    ...props
  }: CheckboxProps = $props();
  let element: HTMLInputElement;

  function handleInput(
    event: Event & { currentTarget: EventTarget & HTMLInputElement },
  ): void {
    checked = element.checked;
    oninput?.(event);
  }

  export function getElement(): HTMLInputElement {
    return element;
  }
</script>

<label class={labelClass}>
  <input bind:this={element} bind:checked {...props} class="ore-checkbox {className ?? ''}" data-color={color} oninput={handleInput} type="checkbox" />
  {@render children?.()}
</label>