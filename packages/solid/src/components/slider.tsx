import "oreui-web/slider";

import type { OreSlider } from "oreui-web/slider";
import { createOreComponent } from "../factory.js";
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
  onValueChange?: (value: number) => void;
};

export const Slider = createOreComponent<OreSlider, SliderProps>({
  model: {
    callback: "onValueChange",
    event: "input",
    property: "value",
  },
  properties: [
    "color",
    "disabled",
    "max",
    "min",
    "name",
    "orientation",
    "step",
    "value",
    "variant",
  ],
  tagName: "ore-slider",
});
