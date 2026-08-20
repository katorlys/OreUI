<script lang="ts">
  import "oreui-web/textarea";
  import type {
    OreTextarea,
    OreTextareaWrap,
  } from "oreui-web/textarea";
  import type { OreComponentProps } from "../types.js";

  export type TextareaProps = OreComponentProps<
    OreTextarea,
    | "autocomplete"
    | "description"
    | "disabled"
    | "error"
    | "inputMode"
    | "label"
    | "maxLength"
    | "minLength"
    | "name"
    | "placeholder"
    | "readonly"
    | "required"
    | "rows"
    | "spellCheck"
    | "value"
    | "wrap"
  > & {
    value?: string;
    wrap?: OreTextareaWrap;
    onChange?: (event: Event) => void;
    onInput?: (event: Event) => void;
  };

  let {
    children,
    value = $bindable(""),
    onChange,
    onInput,
    ...props
  }: TextareaProps = $props();
  let element: OreTextarea;

  function handleInput(event: Event): void {
    value = element.value;
    onInput?.(event);
  }

  export function getElement(): OreTextarea {
    return element;
  }
</script>

<ore-textarea
  bind:this={element}
  {value}
  onchange={onChange}
  oninput={handleInput}
  {...props}
>
  {@render children?.()}
</ore-textarea>