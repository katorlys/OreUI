import { createComponent, type EventName } from "@lit/react";
import {
  OreToast as OreToastElement,
  type OreToastPosition,
  type OreToastVariant,
} from "oreui-web/toast";
import React from "react";

export const Toast = createComponent({
  react: React,
  tagName: "ore-toast",
  elementClass: OreToastElement,
  events: {
    onOpenChange: "open-change" as EventName<CustomEvent<boolean>>,
  },
  displayName: "Toast",
});

export type ToastProps = React.ComponentProps<typeof Toast> & {
  position?: OreToastPosition;
  variant?: OreToastVariant;
};
