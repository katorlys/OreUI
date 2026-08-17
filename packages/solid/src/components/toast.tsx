import "oreui-web/toast";

import type { OreToast } from "oreui-web/toast";
import { createOreComponent } from "../factory.js";
import type { OpenChangeProps, OreComponentProps } from "../types.js";

export type ToastProps = OreComponentProps<
  OreToast,
  "defaultOpen" | "duration" | "open" | "position" | "variant"
> &
  OpenChangeProps;

export const Toast = createOreComponent<OreToast, ToastProps>({
  events: { onOpenChange: "open-change" },
  properties: ["defaultOpen", "duration", "open", "position", "variant"],
  tagName: "ore-toast",
});
