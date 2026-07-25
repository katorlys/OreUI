import { ReactiveElement } from "lit";

export type OreTagVariant =
  | "neutral"
  | "secondary"
  | "primary"
  | "informative"
  | "notice"
  | "warning"
  | "realms-informative";

export class OreTag extends ReactiveElement {
  static properties = {
    outlined: { type: Boolean, reflect: true },
    variant: { type: String, reflect: true },
  };

  declare outlined: boolean;
  declare variant: OreTagVariant;

  constructor() {
    super();
    this.outlined = false;
    this.variant = "neutral";
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }
}

if (!customElements.get("ore-tag")) {
  customElements.define("ore-tag", OreTag);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-tag": OreTag;
  }
}
