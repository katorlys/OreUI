import { createComponent, type EventName } from "@lit/react";
import { OreAccordion as OreAccordionElement } from "oreui-web/accordion";
import React from "react";

export const Accordion = createComponent({
  react: React,
  tagName: "ore-accordion",
  elementClass: OreAccordionElement,
  events: {
    onOpenChange: "open-change" as EventName<CustomEvent<boolean>>,
  },
  displayName: "Accordion",
});

export type AccordionProps = React.ComponentProps<typeof Accordion>;
