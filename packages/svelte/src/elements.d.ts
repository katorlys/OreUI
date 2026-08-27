import type { OreDropdown } from "oreui-web/dropdown";
import type { OreModal } from "oreui-web/modal";
import type { OreRadio } from "oreui-web/radio";
import type { OreRadioGroup } from "oreui-web/radio-group";
import type { OreTabBar } from "oreui-web/tab-bar";
import type { OreTabButton } from "oreui-web/tab-button";
import type { OreToast } from "oreui-web/toast";
import type { OreToggles } from "oreui-web/toggles";
import type { OreTooltip } from "oreui-web/tooltip";
import type { HTMLAttributes } from "svelte/elements";

declare module "svelte/elements" {
  interface SvelteHTMLElements {
    "ore-dropdown": HTMLAttributes<OreDropdown>;
    "ore-modal": HTMLAttributes<OreModal>;
    "ore-radio": HTMLAttributes<OreRadio>;
    "ore-radio-group": HTMLAttributes<OreRadioGroup>;
    "ore-tab-bar": HTMLAttributes<OreTabBar>;
    "ore-tab-button": HTMLAttributes<OreTabButton>;
    "ore-toast": HTMLAttributes<OreToast>;
    "ore-toggles": HTMLAttributes<OreToggles>;
    "ore-tooltip": HTMLAttributes<OreTooltip>;
  }
}

export {};
