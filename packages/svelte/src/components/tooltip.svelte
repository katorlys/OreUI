<script lang="ts">
  import "oreui-web/tooltip";
  import type { OreTooltip, OreTooltipSide } from "oreui-web/tooltip";
  import type { OreComponentProps } from "../types.js";

  export type TooltipProps = OreComponentProps<
    OreTooltip,
    "defaultOpen" | "delay" | "open" | "side"
  > & {
    side?: OreTooltipSide;
    onOpenChange?: (event: CustomEvent<boolean>) => void;
  };

  let { children, onOpenChange, ...props }: TooltipProps = $props();
  let element: OreTooltip;

  export function getElement(): OreTooltip {
    return element;
  }
</script>

<ore-tooltip
  bind:this={element}
  onopen-change={onOpenChange}
  {...props}
>
  {@render children?.()}
</ore-tooltip>