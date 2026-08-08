import { type PropertyValues, ReactiveElement } from "lit";

import type { OreTagVariant } from "../tag/tag.js";

export type OrePopupPosition =
  | "top-start"
  | "top-center"
  | "top-end"
  | "bottom-start"
  | "bottom-center"
  | "bottom-end";
export type OrePopupVariant = OreTagVariant;

export class OrePopup extends ReactiveElement {
  static properties = {
    defaultOpen: { type: Boolean, attribute: "default-open" },
    duration: { type: Number, reflect: true },
    open: { type: Boolean, reflect: true },
    position: { type: String, reflect: true },
    variant: { type: String, reflect: true },
  };

  declare defaultOpen: boolean;
  declare duration: number;
  declare open: boolean;
  declare position: OrePopupPosition;
  declare variant: OrePopupVariant;

  #timer: number | undefined;

  constructor() {
    super();
    this.defaultOpen = false;
    this.duration = 3000;
    this.open = false;
    this.position = "bottom-center";
    this.variant = "neutral";
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("popover", "manual");
    this.setAttribute("role", "status");
    this.setAttribute("aria-live", "polite");
    this.setAttribute("aria-atomic", "true");

    if (this.defaultOpen) {
      this.open = true;
    }
  }

  override disconnectedCallback(): void {
    window.clearTimeout(this.#timer);
    super.disconnectedCallback();
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has("duration")) {
      const duration =
        Number.isFinite(this.duration) && this.duration >= 0
          ? this.duration
          : 3000;

      if (duration !== this.duration) {
        this.duration = duration;
        return;
      }
    }

    if (changed.has("open") || changed.has("duration")) {
      this.#syncOpen();
    }

    if (changed.has("open") && changed.get("open") !== undefined) {
      this.dispatchEvent(
        new CustomEvent<boolean>("open-change", {
          bubbles: true,
          composed: true,
          detail: this.open,
        }),
      );
    }
  }

  show(): void {
    this.open = true;
  }

  close(): void {
    this.open = false;
  }

  #syncOpen(): void {
    window.clearTimeout(this.#timer);

    if (this.open && !this.matches(":popover-open")) {
      this.showPopover();
    } else if (!this.open && this.matches(":popover-open")) {
      this.hidePopover();
    }

    if (this.open && this.duration > 0) {
      this.#timer = window.setTimeout(() => {
        this.open = false;
      }, this.duration);
    }
  }
}

if (!customElements.get("ore-popup")) {
  customElements.define("ore-popup", OrePopup);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-popup": OrePopup;
  }
}
