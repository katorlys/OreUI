import { syncSlider } from "oreui-web/slider";
import { createRenderEffect, splitProps, type JSX } from "solid-js";

export type SliderProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  "color" | "type"
> & {
  color?: string;
  onValueChange?: (value: number) => void;
  orientation?: "horizontal" | "vertical";
  variant?: string;
};

export function Slider(props: SliderProps): JSX.Element {
  let element: HTMLInputElement | undefined;
  const [local, inputProps] = splitProps(props, [
    "class",
    "color",
    "onInput",
    "onValueChange",
    "orientation",
    "ref",
    "variant",
  ]);

  const sync = (node: HTMLInputElement): void => {
    element = node;
    if (typeof local.ref === "function") {
      local.ref(node);
    }
  };

  createRenderEffect(() => {
    inputProps.max;
    inputProps.min;
    inputProps.step;
    inputProps.value;
    if (element) {
      syncSlider(element);
    }
  });

  return (
    <input
      {...inputProps}
      class={`ore-slider ${local.class ?? ""}`}
      aria-orientation={local.orientation}
      data-color={local.color}
      data-orientation={local.orientation}
      data-variant={local.variant}
      onInput={(event) => {
        if (typeof local.onInput === "function") {
          local.onInput(event);
        }
        local.onValueChange?.(event.currentTarget.valueAsNumber);
      }}
      ref={sync}
      type="range"
    />
  );
}
