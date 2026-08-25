import type { OreAccordion } from "oreui-web/accordion";
import type { OreCard } from "oreui-web/card";
import type { OreContainer } from "oreui-web/container";
import type { OreDivider } from "oreui-web/divider";
import type { OreDropdown } from "oreui-web/dropdown";
import type { OreIconButton } from "oreui-web/icon-button";
import type { OreModal } from "oreui-web/modal";
import type { OreNavbar } from "oreui-web/navbar";
import type { OreProgressBar } from "oreui-web/progress-bar";
import type { OreProgressRing } from "oreui-web/progress-ring";
import type { OreRadio } from "oreui-web/radio";
import type { OreRadioGroup } from "oreui-web/radio-group";
import type { OreScrollbar } from "oreui-web/scrollbar";
import type { OreSpinner } from "oreui-web/spinner";
import type { OreTabBar } from "oreui-web/tab-bar";
import type { OreTabButton } from "oreui-web/tab-button";
import type { OreTable } from "oreui-web/table";
import type { OreTag } from "oreui-web/tag";
import type { OreToast } from "oreui-web/toast";
import type { OreToggles } from "oreui-web/toggles";
import type { OreTooltip } from "oreui-web/tooltip";
import type { HTMLAttributes } from "svelte/elements";

declare module "svelte/elements" {
  interface SvelteHTMLElements {
    "ore-accordion": HTMLAttributes<OreAccordion>;
    "ore-card": HTMLAttributes<OreCard>;
    "ore-container": HTMLAttributes<OreContainer>;
    "ore-divider": HTMLAttributes<OreDivider>;
    "ore-dropdown": HTMLAttributes<OreDropdown>;
    "ore-icon-button": HTMLAttributes<OreIconButton>;
    "ore-modal": HTMLAttributes<OreModal>;
    "ore-navbar": HTMLAttributes<OreNavbar>;
    "ore-progress-bar": HTMLAttributes<OreProgressBar>;
    "ore-progress-ring": HTMLAttributes<OreProgressRing>;
    "ore-radio": HTMLAttributes<OreRadio>;
    "ore-radio-group": HTMLAttributes<OreRadioGroup>;
    "ore-scrollbar": HTMLAttributes<OreScrollbar>;
    "ore-spinner": HTMLAttributes<OreSpinner>;
    "ore-tab-bar": HTMLAttributes<OreTabBar>;
    "ore-tab-button": HTMLAttributes<OreTabButton>;
    "ore-table": HTMLAttributes<OreTable>;
    "ore-tag": HTMLAttributes<OreTag>;
    "ore-toast": HTMLAttributes<OreToast>;
    "ore-toggles": HTMLAttributes<OreToggles>;
    "ore-tooltip": HTMLAttributes<OreTooltip>;
  }
}

export {};
