import { createComponent, type EventName } from "@lit/react";
import { OreTextfield as OreTextfieldElement } from "@katorlys/oreui/textfield";
import React from "react";

export const Textfield = createComponent({
  react: React,
  tagName: "ore-textfield",
  elementClass: OreTextfieldElement,
  events: {
    onInput: "input" as EventName<Event>,
    onChange: "change" as EventName<Event>,
  },
  displayName: "Textfield",
});

export type TextfieldProps = React.ComponentProps<typeof Textfield>;
