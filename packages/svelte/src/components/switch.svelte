<script lang="ts">
  import "oreui-web/switch";
  import type {
    OreSwitch,
    OreSwitchColor,
    OreSwitchVariant,
  } from "oreui-web/switch";
  import type { OreComponentProps } from "../types.js";

  export type SwitchProps = OreComponentProps<
    OreSwitch,
    | "checked"
    | "color"
    | "disabled"
    | "name"
    | "required"
    | "value"
    | "variant"
  > & {
    checked?: boolean;
    color?: OreSwitchColor;
    variant?: OreSwitchVariant;
    onChange?: (event: Event) => void;
    onInput?: (event: Event) => void;
  };

  let {
    children,
    checked = $bindable(false),
    onChange,
    onInput,
    ...props
  }: SwitchProps = $props();
  let element: OreSwitch;

  function handleInput(event: Event): void {
    checked = element.checked;
    onInput?.(event);
  }

  export function getElement(): OreSwitch {
    return element;
  }
</script>

<ore-switch
  bind:this={element}
  {checked}
  onchange={onChange}
  oninput={handleInput}
  {...props}
>
  {@render children?.()}
</ore-switch>