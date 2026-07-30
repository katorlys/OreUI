import { createComponent, type EventName } from "@lit/react";
import {
  OreModal as OreModalElement,
  type OreModalCloseDetail,
} from "@katorlys/oreui/modal";
import React from "react";

export const OreModal = createComponent({
  react: React,
  tagName: "ore-modal",
  elementClass: OreModalElement,
  events: {
    onOpenChange: "open-change" as EventName<CustomEvent<boolean>>,
    onModalClose: "modal-close" as EventName<CustomEvent<OreModalCloseDetail>>,
  },
  displayName: "OreModal",
});

export type OreModalProps = React.ComponentProps<typeof OreModal>;
