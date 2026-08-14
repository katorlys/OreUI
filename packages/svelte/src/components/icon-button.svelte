<script lang="ts">
  import "oreui-web/icon-button";
  import type { OreIconButton } from "oreui-web/icon-button";
  import type {
    OreButtonColor,
    OreButtonType,
    OreButtonVariant,
  } from "oreui-web/button";
  import type { OreComponentProps } from "../types.js";

  export type IconButtonProps = OreComponentProps<
    OreIconButton,
    "color" | "disabled" | "type" | "variant"
  > & {
    color?: OreButtonColor;
    type?: OreButtonType;
    variant?: OreButtonVariant;
  };

  let { children, ...props }: IconButtonProps = $props();
  let element: OreIconButton;

  export function getElement(): OreIconButton {
    return element;
  }
</script>

<ore-icon-button bind:this={element} {...props}>
  {@render children?.()}
</ore-icon-button>