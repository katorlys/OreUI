<script lang="ts">
  import "oreui-web/toast";
  import type { OreToastPosition, OreToastVariant } from "oreui-web/toast";
  import { onMount } from "svelte";
  import type { OreComponentProps } from "../types.js";

  export type ToastProps = OreComponentProps<HTMLDivElement> & {
    defaultOpen?: boolean;
    duration?: number;
    open?: boolean;
    position?: OreToastPosition;
    variant?: OreToastVariant;
    onOpenChange?: (event: CustomEvent<boolean>) => void;
  };

  let {
    children,
    class: className,
    defaultOpen = false,
    duration,
    open,
    position = "bottom-center",
    variant = "neutral",
    onOpenChange,
    ...props
  }: ToastProps = $props();
  let element: HTMLDivElement;

  onMount(() => {
    const listener = (event: Event): void => {
      onOpenChange?.(event as CustomEvent<boolean>);
    };
    element.addEventListener("oreui:openchange", listener);
    return () => element.removeEventListener("oreui:openchange", listener);
  });

  export function getElement(): HTMLDivElement {
    return element;
  }
</script>

<div
  bind:this={element}
  class={`ore-toast ${className ?? ""}`}
  data-default-open={defaultOpen ? "" : undefined}
  data-duration={duration}
  data-open={open ? "" : undefined}
  data-position={position}
  data-variant={variant}
  {...props}
>
  {@render children?.()}
</div>