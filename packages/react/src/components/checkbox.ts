import { createComponent, type EventName } from "@lit/react";
import { OreCheckbox as OreCheckboxElement } from "@katorlys/oreui/checkbox";
import React from "react";

export const OreCheckbox = createComponent({
  react: React,
  tagName: "ore-checkbox",
  elementClass: OreCheckboxElement,
  events: {
    onInput: "input" as EventName<Event>,
    onChange: "change" as EventName<Event>,
  },
  displayName: "OreCheckbox",
});

export type OreCheckboxProps = React.ComponentProps<typeof OreCheckbox>;
