import { createComponent, type EventName } from "@lit/react";
import { OreCheckbox as OreCheckboxElement } from "oreui-web/checkbox";
import React from "react";

export const Checkbox = createComponent({
  react: React,
  tagName: "ore-checkbox",
  elementClass: OreCheckboxElement,
  events: {
    onInput: "input" as EventName<Event>,
    onChange: "change" as EventName<Event>,
  },
  displayName: "Checkbox",
});

export type CheckboxProps = React.ComponentProps<typeof Checkbox>;
