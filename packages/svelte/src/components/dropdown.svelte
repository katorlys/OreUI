<script lang="ts">
  import "oreui-web/dropdown";
  import type {
    OreDropdown,
    OreDropdownChangeDetail,
    OreDropdownVariant,
  } from "oreui-web/dropdown";
  import type { OreComponentProps } from "../types.js";

  export type DropdownProps = OreComponentProps<
    OreDropdown,
    "defaultOpen" | "open" | "value" | "variant"
  > & {
    value?: string;
    variant?: OreDropdownVariant;
    onChange?: (event: CustomEvent<OreDropdownChangeDetail>) => void;
    onOpenChange?: (event: CustomEvent<boolean>) => void;
  };

  let {
    children,
    value = $bindable(""),
    onChange,
    onOpenChange,
    ...props
  }: DropdownProps = $props();
  let element: OreDropdown;

  function handleChange(event: CustomEvent<OreDropdownChangeDetail>): void {
    value = element.value;
    onChange?.(event);
  }

  export function getElement(): OreDropdown {
    return element;
  }
</script>

<ore-dropdown
  bind:this={element}
  {value}
  onchange={handleChange}
  onopen-change={onOpenChange}
  {...props}
>
  {@render children?.()}
</ore-dropdown>