<script lang="ts">
  import "oreui-web/dropdown";
  import type {
    OreDropdownChangeDetail,
    OreDropdownVariant,
  } from "oreui-web/dropdown";
  import type { OreComponentProps } from "../types.js";

  export type DropdownProps = OreComponentProps<HTMLDivElement> & {
    value?: string;
    variant?: OreDropdownVariant;
    onChange?: (event: CustomEvent<OreDropdownChangeDetail>) => void;
  };

  let {
    children,
    class: className,
    value = $bindable(""),
    variant = "borderless",
    onChange,
    ...props
  }: DropdownProps = $props();
  let element: HTMLDivElement;

  function handleChange(event: Event): void {
    const changeEvent = event as CustomEvent<OreDropdownChangeDetail>;

    value = changeEvent.detail.value;
    onChange?.(changeEvent);
  }

  export function getElement(): HTMLDivElement {
    return element;
  }
</script>

<div
  bind:this={element}
  class={`ore-dropdown ${className ?? ""}`}
  data-value={value}
  data-variant={variant}
  onchange={handleChange}
  {...props}
>
  {@render children?.()}
</div>