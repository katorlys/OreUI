import "oreui-web/modal";

import type { OreModal, OreModalCloseDetail } from "oreui-web/modal";
import { createOreComponent } from "../factory.js";
import type { OpenChangeProps, OreComponentProps } from "../types.js";

export type ModalProps = OreComponentProps<OreModal, "defaultOpen" | "open"> &
  OpenChangeProps & {
    onModalClose?: (event: CustomEvent<OreModalCloseDetail>) => void;
  };

export const Modal = createOreComponent<OreModal, ModalProps>({
  events: {
    onModalClose: "modal-close",
    onOpenChange: "open-change",
  },
  properties: ["defaultOpen", "open"],
  tagName: "ore-modal",
});
