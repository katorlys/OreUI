<script lang="ts">
  import "oreui-web/modal";
  import type { OreModal, OreModalCloseDetail } from "oreui-web/modal";
  import type { OreComponentProps } from "../types.js";

  export type ModalProps = OreComponentProps<
    OreModal,
    "defaultOpen" | "open"
  > & {
    onModalClose?: (event: CustomEvent<OreModalCloseDetail>) => void;
    onOpenChange?: (event: CustomEvent<boolean>) => void;
  };

  let {
    children,
    onModalClose,
    onOpenChange,
    ...props
  }: ModalProps = $props();
  let element: OreModal;

  export function getElement(): OreModal {
    return element;
  }
</script>

<ore-modal
  bind:this={element}
  onmodal-close={onModalClose}
  onopen-change={onOpenChange}
  {...props}
>
  {@render children?.()}
</ore-modal>