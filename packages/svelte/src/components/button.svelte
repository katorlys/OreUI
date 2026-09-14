<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  export type ButtonProps = HTMLButtonAttributes & {
    color?: string;
    loading?: boolean;
    variant?: string;
  };

  let { children, ...props }: ButtonProps = $props();
  let element: HTMLButtonElement;

  export function getElement(): HTMLButtonElement {
    return element;
  }
</script>

<button bind:this={element} {...props} class="ore-button {props.class ?? ''}" data-color={props.color} data-loading={props.loading ? "" : undefined} data-variant={props.variant} aria-busy={props.loading || undefined} disabled={props.disabled || props.loading}>
  {@render children?.()}
</button>