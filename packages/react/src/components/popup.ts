import { createComponent, type EventName } from "@lit/react";
import {
  OrePopup as OrePopupElement,
  type OrePopupPosition,
  type OrePopupVariant,
} from "@katorlys/oreui/popup";
import React from "react";

export const Popup = createComponent({
  react: React,
  tagName: "ore-popup",
  elementClass: OrePopupElement,
  events: {
    onOpenChange: "open-change" as EventName<CustomEvent<boolean>>,
  },
  displayName: "Popup",
});

export type PopupProps = React.ComponentProps<typeof Popup> & {
  position?: OrePopupPosition;
  variant?: OrePopupVariant;
};
