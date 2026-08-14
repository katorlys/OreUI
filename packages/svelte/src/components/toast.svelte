<script lang="ts">
  import "oreui-web/toast";
  import type {
    OreToast,
    OreToastPosition,
    OreToastVariant,
  } from "oreui-web/toast";
  import type { OreComponentProps } from "../types.js";

  export type ToastProps = OreComponentProps<
    OreToast,
    "defaultOpen" | "duration" | "open" | "position" | "variant"
  > & {
    position?: OreToastPosition;
    variant?: OreToastVariant;
    onOpenChange?: (event: CustomEvent<boolean>) => void;
  };

  let { children, onOpenChange, ...props }: ToastProps = $props();
  let element: OreToast;

  export function getElement(): OreToast {
    return element;
  }
</script>

<ore-toast
  bind:this={element}
  onopen-change={onOpenChange}
  {...props}
>
  {@render children?.()}
</ore-toast>