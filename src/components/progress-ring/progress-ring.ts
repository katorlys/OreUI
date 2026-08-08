import { type PropertyValues, ReactiveElement } from "lit";

const progressRingPath =
  "M4.503.5v1h-1v-1zM23.5.5v1h-2.003v-1zM41.5 1.5v-1h-2.003v1zm1.003 1v-1h-1v1zM59.5.5v1h-2v-1zm1.003 1v1h1v1h-1v-1h-1v-1zM77.5.5v1h-2.003v-1zm1.003 1v1h1v2h-1v-2h-1v-1zM95.5.5v1h-2.003v-1zm1.003 1v1h-1v-1zm0 1h1v3h-1zM113.5.5v1h-2.003v-1zm1.003 1v1h-1v-1zm1 1v3h-1v-3zm-1 3v1h-1v-1zM131.5.5v1h-2.003v-1zm1.003 2v-1h-1v1zm0 3v-3h1v3zm0 0h-1v1h1zm-1.003 1v1h-1v-1zM149.5.5v1h-2.003v-1zm1.003 2v-1h-1v1zm0 3v-3h1v3zm0 0h-1v1h1zm-1.003 1v1h-2.003v-1zM167.5.5v1h-2.003v-1zm1.003 2v-1h-1v1zm0 3v-3h1v3zm0 0h-1v1h1zm-1.003 1v1h-3v-1zM185.5 1.5v-1h-2.003v1zm1.003 1v-1h-1v1zm0 0h1v3h-1zm-4.037 4v-1h-1v1zm4.037 0v-1h-1v1zm-1.003 0v1h-3v-1zM203.5 1.5v-1h-2.003v1zm1.003 1v-1h-1v1zm1 3v-3h-1v3zm-6.037-1v1h-1v-1zm5.037 2v-1h-1v1zm-4.037 0v-1h-1v1zm3.034 1v-1h-3v1zM221.5 1.5v-1h-2.003v1zm1.003 1v-1h-1v1zm1 3v-3h-1v3zm-6.037-2v2h-1v-2zm5.037 3v-1h-1v1zm-4.037 0v-1h-1v1zm3.034 1v-1h-3v1zM239.5 1.5v-1h-2v1zm1.003 1v-1h-1v1zm-5.037 0v3h-1v-3zm6.037 3v-3h-1v3zm-1 1v-1h-1v1zm-4.037 0v-1h-1v1zm3.034 1v-1h-3v1zM257.5 1.5v-1h-2.003v1zm-3.034 1v-1h-1v1zm4.037 0v-1h-1v1zm-5.037 3v-3h-1v3zm0 0h1v1h-1zm6.037 0v-3h-1v3zm-1 1v-1h-1v1zm-1.003 1v-1h-3v1zM275.5 1.5v-1h-3v1zm-3.035 1v-1h-1v1zm4.037 0v-1h-1v1zm-5.037 3v-3h-1v3zm0 0h1v1h-1zm6.037 0v-3h-1v3zm-1 1v-1h-1v1zm-1.002 1v-1h-3v1z";

export class OreProgressRing extends ReactiveElement {
  static properties = {
    max: { type: Number, reflect: true },
    value: { type: Number, reflect: true },
  };

  declare max: number;
  declare value: number;

  constructor() {
    super();
    this.max = 100;
    this.value = 0;
  }

  override connectedCallback(): void {
    super.connectedCallback();

    if (!this.firstElementChild) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );

      svg.setAttribute("viewBox", "0 0 278 8");
      svg.setAttribute("aria-hidden", "true");
      path.setAttribute("fill", "currentColor");
      path.setAttribute("fill-rule", "evenodd");
      path.setAttribute("d", progressRingPath);
      svg.append(path);
      this.append(svg);
    }

    this.#sync();
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has("max") || changed.has("value")) {
      this.#sync();
    }
  }

  #sync(): void {
    const max = Number.isFinite(this.max) && this.max > 0 ? this.max : 100;
    const value = Number.isFinite(this.value)
      ? Math.min(max, Math.max(0, this.value))
      : 0;
    const progress = value / max;
    const frame = Math.min(15, Math.floor(progress * 16));

    if (max !== this.max) {
      this.max = max;
    }

    if (value !== this.value) {
      this.value = value;
    }

    if (!this.hasAttribute("aria-hidden")) {
      this.setAttribute("role", "progressbar");
      this.setAttribute("aria-valuemin", "0");
      this.setAttribute("aria-valuemax", String(max));
      this.setAttribute("aria-valuenow", String(value));
    }

    this.style.setProperty("--ore-progress-ring-frame", String(frame));
  }
}

if (!customElements.get("ore-progress-ring")) {
  customElements.define("ore-progress-ring", OreProgressRing);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-progress-ring": OreProgressRing;
  }
}
