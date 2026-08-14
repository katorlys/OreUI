<script lang="ts">
  import "oreui-web/tab-button";
  import type {
    OreTabButton,
    OreTabButtonPalette,
  } from "oreui-web/tab-button";
  import type {
    OreButtonColor,
    OreButtonType,
    OreButtonVariant,
  } from "oreui-web/button";
  import type { OreComponentProps } from "../types.js";

  export type TabButtonProps = OreComponentProps<
    OreTabButton,
    "color" | "disabled" | "palette" | "selected" | "type" | "variant"
  > & {
    color?: OreButtonColor;
    palette?: OreTabButtonPalette;
    type?: OreButtonType;
    variant?: OreButtonVariant;
    onChange?: (event: Event) => void;
  };

  let { children, onChange, ...props }: TabButtonProps = $props();
  let element: OreTabButton;

  export function getElement(): OreTabButton {
    return element;
  }
</script>

<ore-tab-button bind:this={element} onchange={onChange} {...props}>
  {@render children?.()}
</ore-tab-button>