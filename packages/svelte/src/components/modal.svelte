<script lang="ts">
  import type { OreComponentProps } from "../types.js";

  export type ModalProps = OreComponentProps<HTMLDialogElement, "open">;

  let { children, class: className, ...props }: ModalProps = $props();
  let element: HTMLDialogElement;

  export function getElement(): HTMLDialogElement {
    return element;
  }
</script>

<dialog bind:this={element} class={`ore-modal ${className ?? ""}`} {...props}>
  {@render children?.()}
</dialog>