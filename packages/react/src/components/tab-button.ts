import { createComponent, type EventName } from "@lit/react";
import { OreTabButton as OreTabButtonElement } from "oreui-web/tab-button";
import React from "react";

export const TabButton = createComponent({
  react: React,
  tagName: "ore-tab-button",
  elementClass: OreTabButtonElement,
  events: {
    onChange: "change" as EventName<Event>,
  },
  displayName: "TabButton",
});

export type TabButtonProps = React.ComponentProps<typeof TabButton>;
