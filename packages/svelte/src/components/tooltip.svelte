<script lang="ts">
  import "oreui-web/tooltip";
  import type { OreTooltipSide } from "oreui-web/tooltip";
  import { onMount } from "svelte";
  import type { OreComponentProps } from "../types.js";

  export type TooltipProps = OreComponentProps<HTMLSpanElement> & {
    defaultOpen?: boolean;
    delay?: number;
    open?: boolean;
    side?: OreTooltipSide;
    onOpenChange?: (event: CustomEvent<boolean>) => void;
  };

  let {
    children,
    class: className,
    defaultOpen = false,
    delay,
    open,
    side = "top",
    onOpenChange,
    ...props
  }: TooltipProps = $props();
  let element: HTMLSpanElement;

  onMount(() => {
    const listener = (event: Event): void => {
      onOpenChange?.(event as CustomEvent<boolean>);
    };

    element.addEventListener("oreui:openchange", listener);
    return () => element.removeEventListener("oreui:openchange", listener);
  });

  export function getElement(): HTMLSpanElement {
    return element;
  }
</script>

<span
  bind:this={element}
  class={`ore-tooltip ${className ?? ""}`}
  data-default-open={defaultOpen ? "" : undefined}
  data-delay={delay}
  data-open={open === undefined ? undefined : String(open)}
  data-side={side}
  {...props}
>
  {@render children?.()}
</span>