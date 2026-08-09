import { createComponent, type EventName } from "@lit/react";
import { OreSwitch as OreSwitchElement } from "oreui-web/switch";
import React from "react";

export const Switch = createComponent({
  react: React,
  tagName: "ore-switch",
  elementClass: OreSwitchElement,
  events: {
    onInput: "input" as EventName<Event>,
    onChange: "change" as EventName<Event>,
  },
  displayName: "Switch",
});

export type SwitchProps = React.ComponentProps<typeof Switch>;
