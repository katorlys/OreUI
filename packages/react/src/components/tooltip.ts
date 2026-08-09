import { createComponent, type EventName } from "@lit/react";
import { OreTooltip as OreTooltipElement } from "oreui-web/tooltip";
import React from "react";

export const Tooltip = createComponent({
  react: React,
  tagName: "ore-tooltip",
  elementClass: OreTooltipElement,
  events: {
    onOpenChange: "open-change" as EventName<CustomEvent<boolean>>,
  },
  displayName: "Tooltip",
});

export type TooltipProps = React.ComponentProps<typeof Tooltip>;
