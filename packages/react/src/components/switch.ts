import { createComponent, type EventName } from "@lit/react";
import { OreSwitch as OreSwitchElement } from "@katorlys/oreui/switch";
import React from "react";

export const OreSwitch = createComponent({
  react: React,
  tagName: "ore-switch",
  elementClass: OreSwitchElement,
  events: {
    onInput: "input" as EventName<Event>,
    onChange: "change" as EventName<Event>,
  },
  displayName: "OreSwitch",
});

export type OreSwitchProps = React.ComponentProps<typeof OreSwitch>;
