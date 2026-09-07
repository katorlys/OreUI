<script lang="ts">
  import type {
    OreTabButtonPalette,
  } from "oreui-web/tab-button";
  import type {
    OreButtonColor,
    OreButtonType,
    OreButtonVariant,
  } from "oreui-web/button";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  export type TabButtonProps = Omit<HTMLButtonAttributes, "children" | "color"> & {
    color?: OreButtonColor;
    children?: Snippet;
    palette?: OreTabButtonPalette;
    selected?: boolean;
    type?: OreButtonType;
    variant?: OreButtonVariant;
    onChange?: (event: Event) => void;
  };

  let {
    children,
    color,
    onChange,
    palette,
    selected = false,
    type = "button",
    variant,
    ...props
  }: TabButtonProps = $props();
  let element: HTMLButtonElement;

  export function getElement(): HTMLButtonElement {
    return element;
  }
</script>

<button class="ore-tab-button" bind:this={element} aria-selected={selected} data-color={color} data-palette={palette} data-variant={variant} role="tab" type={type} {...props}>
  {@render children?.()}
</button>