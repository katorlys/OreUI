import { createComponent, type EventName } from "@lit/react";
import { OreSlider as OreSliderElement } from "@katorlys/oreui/slider";
import React from "react";

export const Slider = createComponent({
  react: React,
  tagName: "ore-slider",
  elementClass: OreSliderElement,
  events: {
    onInput: "input" as EventName<Event>,
    onChange: "change" as EventName<Event>,
  },
  displayName: "Slider",
});

export type SliderProps = React.ComponentProps<typeof Slider>;
