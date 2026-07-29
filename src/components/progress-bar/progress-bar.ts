import { type PropertyValues, ReactiveElement } from "lit";

export type OreProgressBarVariant = "labeled" | "plain";
export type OreProgressBarLabelPosition = "bottom" | "top";
export type OreProgressBarLabelAlign = "center" | "end" | "start";

export class OreProgressBar extends ReactiveElement {
  static properties = {
    label: { type: String, reflect: true },
    labelAlign: { type: String, attribute: "label-align", reflect: true },
    labelPosition: {
      type: String,
      attribute: "label-position",
      reflect: true,
    },
    max: { type: Number, reflect: true },
    value: { type: Number, reflect: true },
    variant: { type: String, reflect: true },
  };

  declare label: string;
  declare labelAlign: OreProgressBarLabelAlign;
  declare labelPosition: OreProgressBarLabelPosition;
  declare max: number;
  declare value: number;
  declare variant: OreProgressBarVariant;

  constructor() {
    super();
    this.label = "";
    this.labelAlign = "center";
    this.labelPosition = "bottom";
    this.max = 100;
    this.value = 0;
    this.variant = "plain";
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.#setup();
    this.#sync();
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (
      changed.has("label") ||
      changed.has("max") ||
      changed.has("value") ||
      changed.has("variant")
    ) {
      this.#sync();
    }
  }

  #sync(): void {
    const max = Number.isFinite(this.max) && this.max > 0 ? this.max : 100;
    const value = Number.isFinite(this.value)
      ? Math.min(max, Math.max(0, this.value))
      : 0;
    const progress = value / max;

    if (max !== this.max) {
      this.max = max;
    }

    if (value !== this.value) {
      this.value = value;
    }

    this.setAttribute("role", "progressbar");
    this.setAttribute("aria-valuemin", "0");
    this.setAttribute("aria-valuemax", String(max));
    this.setAttribute("aria-valuenow", String(value));
    this.style.setProperty("--ore-progress-bar-value", String(progress));

    const label = this.querySelector<HTMLElement>(
      ":scope > .ore-progress-bar-label",
    );

    if (!label) {
      return;
    }

    if (!label.hasAttribute("data-custom-label")) {
      label.textContent = this.label || `${Math.round(progress * 100)}%`;
    }

    const valueText =
      this.label ||
      (label.hasAttribute("data-custom-label")
        ? label.textContent?.trim()
        : "");

    if (valueText) {
      this.setAttribute("aria-valuetext", valueText);
    } else {
      this.removeAttribute("aria-valuetext");
    }
  }

  #setup(): void {
    let track = this.querySelector<HTMLElement>(
      ":scope > .ore-progress-bar-track",
    );
    let label = this.querySelector<HTMLElement>(
      ":scope > .ore-progress-bar-label",
    );

    if (!track) {
      track = document.createElement("span");
      track.className = "ore-progress-bar-track";
      track.setAttribute("aria-hidden", "true");
      this.prepend(track);
    }

    if (!label) {
      label = document.createElement("span");
      label.className = "ore-progress-bar-label";
      this.append(label);
    } else if (label.textContent?.trim()) {
      label.setAttribute("data-custom-label", "");
    }
  }
}

if (!customElements.get("ore-progress-bar")) {
  customElements.define("ore-progress-bar", OreProgressBar);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-progress-bar": OreProgressBar;
  }
}
