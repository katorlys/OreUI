<script lang="ts">
  import "oreui-web/slider";
  import type {
    OreSlider,
    OreSliderColor,
    OreSliderOrientation,
    OreSliderVariant,
  } from "oreui-web/slider";
  import type { OreComponentProps } from "../types.js";

  export type SliderProps = OreComponentProps<
    OreSlider,
    | "color"
    | "disabled"
    | "max"
    | "min"
    | "name"
    | "orientation"
    | "step"
    | "value"
    | "variant"
  > & {
    color?: OreSliderColor;
    orientation?: OreSliderOrientation;
    value?: number;
    variant?: OreSliderVariant;
    onChange?: (event: Event) => void;
    onInput?: (event: Event) => void;
  };

  let {
    children,
    value = $bindable(0),
    onChange,
    onInput,
    ...props
  }: SliderProps = $props();
  let element: OreSlider;

  function handleInput(event: Event): void {
    value = element.value;
    onInput?.(event);
  }

  export function getElement(): OreSlider {
    return element;
  }
</script>

<ore-slider
  bind:this={element}
  {value}
  onchange={onChange}
  oninput={handleInput}
  {...props}
>
  {@render children?.()}
</ore-slider>