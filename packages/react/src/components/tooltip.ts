import { createComponent, type EventName } from "@lit/react";
import { OreTooltip as OreTooltipElement } from "@katorlys/oreui/tooltip";
import React from "react";

export const OreTooltip = createComponent({
  react: React,
  tagName: "ore-tooltip",
  elementClass: OreTooltipElement,
  events: {
    onOpenChange: "open-change" as EventName<CustomEvent<boolean>>,
  },
  displayName: "OreTooltip",
});

export type OreTooltipProps = React.ComponentProps<typeof OreTooltip>;
