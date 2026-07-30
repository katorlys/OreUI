import { createComponent } from "@lit/react";
import { OreRadioGroup as OreRadioGroupElement } from "@katorlys/oreui/radio-group";
import React from "react";

export const OreRadioGroup = createComponent({
  react: React,
  tagName: "ore-radio-group",
  elementClass: OreRadioGroupElement,
  displayName: "OreRadioGroup",
});

export type OreRadioGroupProps = React.ComponentProps<typeof OreRadioGroup>;
