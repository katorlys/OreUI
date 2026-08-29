<script lang="ts">
  import type {
    OreTabButtonPalette,
  } from "oreui-web/tab-button";
  import type {
    OreButtonColor,
    OreButtonType,
    OreButtonVariant,
  } from "oreui-web/button";
  import type { OreComponentProps } from "../types.js";

  export type TabButtonProps = OreComponentProps<
    HTMLButtonElement,
    "color" | "disabled" | "palette" | "selected" | "type" | "variant"
  > & {
    color?: OreButtonColor;
    palette?: OreTabButtonPalette;
    type?: OreButtonType;
    variant?: OreButtonVariant;
    onChange?: (event: Event) => void;
  };

  let { children, onChange, ...props }: TabButtonProps = $props();
  let element: HTMLButtonElement;

  export function getElement(): HTMLButtonElement {
    return element;
  }
</script>

<button class="ore-tab-button" bind:this={element} onchange={onChange} aria-selected={props.selected} data-palette={props.palette} data-variant={props.variant} role="tab" {...props}>
  {@render children?.()}
</button>