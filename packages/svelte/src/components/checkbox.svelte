<script lang="ts">
  import "oreui-web/checkbox";
  import type { OreCheckbox, OreCheckboxColor } from "oreui-web/checkbox";
  import type { OreComponentProps } from "../types.js";

  export type CheckboxProps = OreComponentProps<
    OreCheckbox,
    "checked" | "color" | "disabled" | "name" | "required" | "value"
  > & {
    checked?: boolean;
    color?: OreCheckboxColor;
    onChange?: (event: Event) => void;
    onInput?: (event: Event) => void;
  };

  let {
    children,
    checked = $bindable(false),
    onChange,
    onInput,
    ...props
  }: CheckboxProps = $props();
  let element: OreCheckbox;

  function handleInput(event: Event): void {
    checked = element.checked;
    onInput?.(event);
  }

  export function getElement(): OreCheckbox {
    return element;
  }
</script>

<ore-checkbox
  bind:this={element}
  {checked}
  onchange={onChange}
  oninput={handleInput}
  {...props}
>
  {@render children?.()}
</ore-checkbox>