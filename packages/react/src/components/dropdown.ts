import { createComponent, type EventName } from "@lit/react";
import {
  OreDropdown as OreDropdownElement,
  type OreDropdownChangeDetail,
} from "oreui-web/dropdown";
import React from "react";

export const Dropdown = createComponent({
  react: React,
  tagName: "ore-dropdown",
  elementClass: OreDropdownElement,
  events: {
    onOpenChange: "open-change" as EventName<CustomEvent<boolean>>,
    onChange: "change" as EventName<CustomEvent<OreDropdownChangeDetail>>,
  },
  displayName: "Dropdown",
});

export type DropdownProps = React.ComponentProps<typeof Dropdown>;
