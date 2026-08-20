import { createComponent, type EventName } from "@lit/react";
import { OreTextarea as OreTextareaElement } from "oreui-web/textarea";
import React from "react";

export const Textarea = createComponent({
  react: React,
  tagName: "ore-textarea",
  elementClass: OreTextareaElement,
  events: {
    onInput: "input" as EventName<Event>,
    onChange: "change" as EventName<Event>,
  },
  displayName: "Textarea",
});

export type TextareaProps = React.ComponentProps<typeof Textarea>;
