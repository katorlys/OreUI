import { createComponent, type EventName } from "@lit/react";
import {
  OreModal as OreModalElement,
  type OreModalCloseDetail,
} from "oreui-web/modal";
import React from "react";

export const Modal = createComponent({
  react: React,
  tagName: "ore-modal",
  elementClass: OreModalElement,
  events: {
    onOpenChange: "open-change" as EventName<CustomEvent<boolean>>,
    onModalClose: "modal-close" as EventName<CustomEvent<OreModalCloseDetail>>,
  },
  displayName: "Modal",
});

export type ModalProps = React.ComponentProps<typeof Modal>;
