<script lang="ts">
  import "oreui-web/progress-bar";
  import type {
    OreProgressBar,
    OreProgressBarLabelAlign,
    OreProgressBarLabelPosition,
    OreProgressBarVariant,
  } from "oreui-web/progress-bar";
  import type { OreComponentProps } from "../types.js";

  export type ProgressBarProps = OreComponentProps<
    OreProgressBar,
    "label" | "labelAlign" | "labelPosition" | "max" | "value" | "variant"
  > & {
    labelAlign?: OreProgressBarLabelAlign;
    labelPosition?: OreProgressBarLabelPosition;
    variant?: OreProgressBarVariant;
  };

  let { children, ...props }: ProgressBarProps = $props();
  let element: OreProgressBar;

  export function getElement(): OreProgressBar {
    return element;
  }
</script>

<ore-progress-bar bind:this={element} {...props}>
  {@render children?.()}
</ore-progress-bar>