import { createComponent, type EventName } from "@lit/react";
import { OreRadio as OreRadioElement } from "oreui-web/radio";
import React from "react";

export const Radio = createComponent({
  react: React,
  tagName: "ore-radio",
  elementClass: OreRadioElement,
  events: {
    onInput: "input" as EventName<Event>,
    onChange: "change" as EventName<Event>,
  },
  displayName: "Radio",
});

export type RadioProps = React.ComponentProps<typeof Radio>;
