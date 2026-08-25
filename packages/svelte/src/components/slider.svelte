<script lang="ts">
  import { syncSlider } from "oreui-web/slider";
  import type { HTMLInputAttributes } from "svelte/elements";

  export type SliderProps = Omit<HTMLInputAttributes, "color" | "type" | "value"> & {
    color?: string;
    orientation?: "horizontal" | "vertical";
    value?: number;
    variant?: string;
  };

  let {
    color,
    max,
    min,
    oninput,
    orientation,
    step,
    value = $bindable(0),
    variant,
    ...props
  }: SliderProps = $props();
  let element: HTMLInputElement;

  $effect(() => {
    max;
    min;
    step;
    value;
    if (element) {
      syncSlider(element);
    }
  });

  function handleInput(
    event: Event & { currentTarget: EventTarget & HTMLInputElement },
  ): void {
    value = element.valueAsNumber;
    oninput?.(event);
  }

  export function getElement(): HTMLInputElement {
    return element;
  }
</script>

<input
  bind:this={element}
  bind:value
  {...props}
  aria-orientation={orientation}
  data-color={color}
  data-orientation={orientation}
  data-variant={variant}
  {max}
  {min}
  oninput={handleInput}
  {step}
  type="range"
/>