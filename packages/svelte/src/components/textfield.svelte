<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";

  export type TextfieldProps = Omit<HTMLInputAttributes, "children" | "value"> & {
    children?: Snippet;
    description?: string;
    error?: string;
    label?: string;
    onInput?: (event: Event) => void;
    value?: string;
  };

  let {
    children,
    description,
    error,
    label,
    class: className,
    value = $bindable(""),
    onInput,
    style,
    ...props
  }: TextfieldProps = $props();
  let element: HTMLInputElement;
  const generatedInputId = `ore-textfield-${crypto.randomUUID()}`;

  const inputId = $derived(props.id ?? generatedInputId);
  const descriptionId = $derived(description ? `${inputId}-description` : undefined);
  const errorId = $derived(error ? `${inputId}-error` : undefined);

  $effect(() => {
    element?.setCustomValidity(error ?? "");
  });

  function handleInput(event: Event): void {
    value = element.value;
    onInput?.(event);
  }

  export function getElement(): HTMLInputElement {
    return element;
  }
</script>

<div class="ore-textfield {className ?? ''}" {style}>
  {#if label}
    <label class="ore-textfield-label" for={inputId}>{label}</label>
  {/if}
  <span class="ore-textfield-control">
    {@render children?.()}
    <input
      bind:this={element}
      bind:value
      {...props}
      aria-describedby={[descriptionId, errorId].filter(Boolean).join(" ") || undefined}
      aria-invalid={error ? "true" : undefined}
      class="ore-textfield-input"
      id={inputId}
      oninput={handleInput}
    />
  </span>
  {#if description}
    <span class="ore-textfield-description" id={descriptionId}>{description}</span>
  {/if}
  {#if error}
    <span class="ore-textfield-error" id={errorId} aria-live="polite">{error}</span>
  {/if}
</div>