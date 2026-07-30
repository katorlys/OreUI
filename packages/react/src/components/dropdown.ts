import { createComponent, type EventName } from "@lit/react";
import {
  OreDropdown as OreDropdownElement,
  type OreDropdownChangeDetail,
} from "@katorlys/oreui/dropdown";
import React from "react";

export const OreDropdown = createComponent({
  react: React,
  tagName: "ore-dropdown",
  elementClass: OreDropdownElement,
  events: {
    onOpenChange: "open-change" as EventName<CustomEvent<boolean>>,
    onChange: "change" as EventName<CustomEvent<OreDropdownChangeDetail>>,
  },
  displayName: "OreDropdown",
});

export type OreDropdownProps = React.ComponentProps<typeof OreDropdown>;
