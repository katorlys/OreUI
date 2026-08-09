import { createComponent } from "@lit/react";
import { OreRadioGroup as OreRadioGroupElement } from "oreui-web/radio-group";
import React from "react";

export { Radio, type RadioProps } from "./radio.js";

export const RadioGroup = createComponent({
  react: React,
  tagName: "ore-radio-group",
  elementClass: OreRadioGroupElement,
  displayName: "RadioGroup",
});

export type RadioGroupProps = React.ComponentProps<typeof RadioGroup>;
