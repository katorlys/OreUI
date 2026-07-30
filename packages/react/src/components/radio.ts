import { createComponent, type EventName } from "@lit/react";
import { OreRadio as OreRadioElement } from "@katorlys/oreui/radio";
import React from "react";

export const OreRadio = createComponent({
  react: React,
  tagName: "ore-radio",
  elementClass: OreRadioElement,
  events: {
    onInput: "input" as EventName<Event>,
    onChange: "change" as EventName<Event>,
  },
  displayName: "OreRadio",
});

export type OreRadioProps = React.ComponentProps<typeof OreRadio>;
