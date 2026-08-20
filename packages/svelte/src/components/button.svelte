<script lang="ts">
  import "oreui-web/button";
  import type {
    OreButton,
    OreButtonColor,
    OreButtonType,
    OreButtonVariant,
  } from "oreui-web/button";
  import type { OreComponentProps } from "../types.js";

  export type ButtonProps = OreComponentProps<
    OreButton,
    | "color"
    | "disabled"
    | "download"
    | "href"
    | "loading"
    | "name"
    | "rel"
    | "target"
    | "type"
    | "value"
    | "variant"
  > & {
    color?: OreButtonColor;
    type?: OreButtonType;
    variant?: OreButtonVariant;
  };

  let { children, ...props }: ButtonProps = $props();
  let element: OreButton;

  export function getElement(): OreButton {
    return element;
  }
</script>

<ore-button bind:this={element} {...props}>
  {@render children?.()}
</ore-button>