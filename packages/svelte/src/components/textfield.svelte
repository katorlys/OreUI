<script lang="ts">
  import "oreui-web/textfield";
  import type { OreTextfield } from "oreui-web/textfield";
  import type { OreComponentProps } from "../types.js";

  export type TextfieldProps = OreComponentProps<
    OreTextfield,
    | "autocomplete"
    | "description"
    | "disabled"
    | "error"
    | "inputMode"
    | "label"
    | "list"
    | "max"
    | "maxLength"
    | "min"
    | "minLength"
    | "name"
    | "pattern"
    | "placeholder"
    | "readonly"
    | "required"
    | "step"
    | "type"
    | "value"
  > & {
    value?: string;
    onChange?: (event: Event) => void;
    onInput?: (event: Event) => void;
  };

  let {
    children,
    value = $bindable(""),
    onChange,
    onInput,
    ...props
  }: TextfieldProps = $props();
  let element: OreTextfield;

  function handleInput(event: Event): void {
    value = element.value;
    onInput?.(event);
  }

  export function getElement(): OreTextfield {
    return element;
  }
</script>

<ore-textfield
  bind:this={element}
  {value}
  onchange={onChange}
  oninput={handleInput}
  {...props}
>
  {@render children?.()}
</ore-textfield>