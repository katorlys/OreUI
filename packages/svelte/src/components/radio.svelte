<script lang="ts">
  import "oreui-web/radio";
  import type { OreRadio, OreRadioColor } from "oreui-web/radio";
  import type { OreComponentProps } from "../types.js";

  export type RadioProps = OreComponentProps<
    OreRadio,
    "checked" | "color" | "disabled" | "name" | "required" | "value"
  > & {
    color?: OreRadioColor;
    onChange?: (event: Event) => void;
    onInput?: (event: Event) => void;
  };

  let { children, onChange, onInput, ...props }: RadioProps = $props();
  let element: OreRadio;

  export function getElement(): OreRadio {
    return element;
  }
</script>

<ore-radio
  bind:this={element}
  onchange={onChange}
  oninput={onInput}
  {...props}
>
  {@render children?.()}
</ore-radio>