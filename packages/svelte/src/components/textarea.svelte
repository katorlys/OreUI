<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLTextareaAttributes } from "svelte/elements";

  export type TextareaProps = Omit<HTMLTextareaAttributes, "children" | "value"> & {
    children?: Snippet;
    value?: string;
    onChange?: (event: Event) => void;
    onInput?: (event: Event) => void;
    description?: string;
    error?: string;
    label?: string;
  };

  let {
    children,
    description,
    error,
    label,
    class: className,
    value = $bindable(""),
    onChange,
    onInput,
    style,
    ...props
  }: TextareaProps = $props();
  let element: HTMLTextAreaElement;
  const generatedTextareaId = `ore-textarea-${crypto.randomUUID()}`;

  const textareaId = $derived(props.id ?? generatedTextareaId);
  const descriptionId = $derived(description ? `${textareaId}-description` : undefined);
  const errorId = $derived(error ? `${textareaId}-error` : undefined);

  function handleInput(event: Event): void {
    value = element.value;
    onInput?.(event);
  }

  $effect(() => {
    element?.setCustomValidity(error ?? "");
  });

  export function getElement(): HTMLTextAreaElement {
    return element;
  }
</script>

<div class="ore-textarea {className ?? ''}" {style}>
  {#if label}
    <label class="ore-textarea-label" for={textareaId}>{label}</label>
  {/if}
  <span class="ore-textarea-control">
    {@render children?.()}
    <textarea
      bind:this={element}
      bind:value
      {...props}
      aria-describedby={[descriptionId, errorId].filter(Boolean).join(" ") || undefined}
      aria-invalid={error ? "true" : undefined}
      class="ore-textarea-input"
      id={textareaId}
      onchange={onChange}
      oninput={handleInput}
    ></textarea>
  </span>
  {#if description}
    <span class="ore-textarea-description" id={descriptionId}>{description}</span>
  {/if}
  {#if error}
    <span class="ore-textarea-error" id={errorId} aria-live="polite">{error}</span>
  {/if}
</div>