<script lang="ts">
  import "oreui-web/accordion";
  import type { OreAccordion } from "oreui-web/accordion";
  import type { OreComponentProps } from "../types.js";

  export type AccordionProps = OreComponentProps<
    OreAccordion,
    "defaultOpen" | "open" | "value"
  > & {
    onOpenChange?: (event: CustomEvent<boolean>) => void;
  };

  let { children, onOpenChange, ...props }: AccordionProps = $props();
  let element: OreAccordion;

  export function getElement(): OreAccordion {
    return element;
  }
</script>

<ore-accordion
  bind:this={element}
  onopen-change={onOpenChange}
  {...props}
>
  {@render children?.()}
</ore-accordion>