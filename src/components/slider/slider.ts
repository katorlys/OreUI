import { type PropertyValues, ReactiveElement } from "lit";

export type OreSliderColor =
  | "destructive"
  | "dungeons"
  | "gold"
  | "legends"
  | "primary"
  | "realms"
  | "secondary";
export type OreSliderVariant = "default" | "segmented";
export type OreSliderOrientation = "horizontal" | "vertical";

export class OreSlider extends ReactiveElement {
  static formAssociated = true;

  static properties = {
    disabled: { type: Boolean, reflect: true },
    color: { type: String, reflect: true },
    max: { type: Number, reflect: true },
    min: { type: Number, reflect: true },
    name: { type: String, reflect: true },
    orientation: { type: String, reflect: true },
    step: { type: Number, reflect: true },
    value: { type: Number, reflect: true },
    variant: { type: String, reflect: true },
  };

  declare disabled: boolean;
  declare color: OreSliderColor;
  declare max: number;
  declare min: number;
  declare name: string;
  declare orientation: OreSliderOrientation;
  declare step: number;
  declare value: number;
  declare variant: OreSliderVariant;

  readonly #internals = this.attachInternals();
  #defaultValue = 0;
  #formDisabled = false;

  constructor() {
    super();
    this.disabled = false;
    this.color = "primary";
    this.max = 100;
    this.min = 0;
    this.name = "";
    this.orientation = "horizontal";
    this.step = 1;
    this.value = 0;
    this.variant = "default";
  }

  get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  get labels(): NodeList {
    return this.#internals.labels;
  }

  override connectedCallback(): void {
    this.#defaultValue = this.hasAttribute("value")
      ? Number(this.getAttribute("value"))
      : this.value;
    super.connectedCallback();

    if (!this.input) {
      const input = document.createElement("input");
      input.type = "range";
      input.defaultValue = String(this.#defaultValue);
      input.addEventListener("input", this.#handleInput);
      input.addEventListener("change", this.#handleChange);
      this.prepend(input);
    }

    this.addEventListener("click", this.#handleClick);
    this.#sync();
  }

  override disconnectedCallback(): void {
    this.removeEventListener("click", this.#handleClick);
    super.disconnectedCallback();
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (
      changed.has("disabled") ||
      changed.has("max") ||
      changed.has("min") ||
      changed.has("orientation") ||
      changed.has("step") ||
      changed.has("value")
    ) {
      this.#sync();
    }
  }

  formDisabledCallback(disabled: boolean): void {
    this.#formDisabled = disabled;
    this.toggleAttribute("form-disabled", disabled);
    this.#sync();
  }

  formResetCallback(): void {
    this.value = this.#defaultValue;
    this.#sync();
  }

  get input(): HTMLInputElement | null {
    return this.querySelector(":scope > input[type=range]");
  }

  #sync(): void {
    const input = this.input;

    if (!input) {
      return;
    }

    const range = this.max - this.min;
    const value = Math.min(this.max, Math.max(this.min, this.value));

    input.disabled = this.disabled || this.#formDisabled;
    input.min = String(this.min);
    input.max = String(this.max);
    input.step = String(this.step);
    input.value = String(value);
    input.setAttribute("aria-orientation", this.orientation);
    input.setAttribute(
      "aria-label",
      this.getAttribute("aria-label") ??
        this.#internals.labels.item(0)?.textContent?.trim() ??
        "Slider",
    );
    const progress = range > 0 ? (value - this.min) / range : 0;
    const segmentSize =
      range > 0 && this.step > 0 ? Math.min(this.step / range, 1) : 1;

    this.style.setProperty("--ore-slider-progress", String(progress));
    this.style.setProperty(
      "--ore-slider-segment-size",
      `${segmentSize * 100}%`,
    );
    this.#internals.setFormValue(String(value));

    if (value !== this.value) {
      this.value = value;
    }
  }

  readonly #handleInput = (event: Event): void => {
    event.stopPropagation();
    this.value = this.input?.valueAsNumber ?? this.value;
    this.#sync();
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  };

  readonly #handleClick = (event: MouseEvent): void => {
    if (event.target === this && !this.input?.disabled) {
      this.input?.focus();
    }
  };

  readonly #handleChange = (event: Event): void => {
    event.stopPropagation();
    this.dispatchEvent(new Event("change", { bubbles: true }));
  };
}

if (!customElements.get("ore-slider")) {
  customElements.define("ore-slider", OreSlider);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-slider": OreSlider;
  }
}
