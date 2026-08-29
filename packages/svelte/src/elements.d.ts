import type { OreModal } from "oreui-web/modal";
import type { OreRadio } from "oreui-web/radio";
import type { OreRadioGroup } from "oreui-web/radio-group";
import type { OreToggles } from "oreui-web/toggles";
import type { HTMLAttributes } from "svelte/elements";

declare module "svelte/elements" {
  interface SvelteHTMLElements {
    "ore-modal": HTMLAttributes<OreModal>;
    "ore-radio": HTMLAttributes<OreRadio>;
    "ore-radio-group": HTMLAttributes<OreRadioGroup>;
    "ore-toggles": HTMLAttributes<OreToggles>;
  }
}

export {};
