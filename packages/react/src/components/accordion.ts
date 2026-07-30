import { createComponent, type EventName } from "@lit/react";
import { OreAccordion as OreAccordionElement } from "@katorlys/oreui/accordion";
import React from "react";

export const OreAccordion = createComponent({
  react: React,
  tagName: "ore-accordion",
  elementClass: OreAccordionElement,
  events: {
    onOpenChange: "open-change" as EventName<CustomEvent<boolean>>,
  },
  displayName: "OreAccordion",
});

export type OreAccordionProps = React.ComponentProps<typeof OreAccordion>;
