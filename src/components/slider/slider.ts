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
    range: { type: Boolean, reflect: true },
    step: { type: Number, reflect: true },
    value: { type: Number, reflect: true },
    valueStart: { type: Number, attribute: "value-start", reflect: true },
    variant: { type: String, reflect: true },
  };

  declare disabled: boolean;
  declare color: OreSliderColor;
  declare max: number;
  declare min: number;
  declare name: string;
  declare orientation: OreSliderOrientation;
  declare range: boolean;
  declare step: number;
  declare value: number;
  declare valueStart: number;
  declare variant: OreSliderVariant;

  readonly #internals = this.attachInternals();
  #defaultValue = 0;
  #defaultValueStart = 0;
  #formDisabled = false;

  constructor() {
    super();
    this.disabled = false;
    this.color = "primary";
    this.max = 100;
    this.min = 0;
    this.name = "";
    this.orientation = "horizontal";
    this.range = false;
    this.step = 1;
    this.value = 0;
    this.valueStart = 0;
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
    this.#defaultValueStart = this.hasAttribute("value-start")
      ? Number(this.getAttribute("value-start"))
      : this.valueStart;
    super.connectedCallback();

    if (!this.input) {
      const input = document.createElement("input");
      input.type = "range";
      input.className = "ore-slider-input ore-slider-input-end";
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
      changed.has("range") ||
      changed.has("step") ||
      changed.has("value") ||
      changed.has("valueStart")
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
    this.valueStart = this.#defaultValueStart;
    this.#sync();
  }

  get input(): HTMLInputElement | null {
    return this.querySelector(":scope > .ore-slider-input-end");
  }

  get startInput(): HTMLInputElement | null {
    return this.querySelector(":scope > .ore-slider-input-start");
  }

  #sync(): void {
    const input = this.input;

    if (!input) {
      return;
    }

    let startInput = this.startInput;

    if (this.range && !startInput) {
      startInput = document.createElement("input");
      startInput.type = "range";
      startInput.className = "ore-slider-input ore-slider-input-start";
      startInput.defaultValue = String(this.#defaultValueStart);
      startInput.addEventListener("input", this.#handleInput);
      startInput.addEventListener("change", this.#handleChange);
      input.before(startInput);
    } else if (!this.range && startInput) {
      startInput.remove();
      startInput = null;
    }

    const rangeSize = this.max - this.min;
    const value = Math.min(this.max, Math.max(this.min, this.value));
    const valueStart = this.range
      ? Math.min(value, Math.max(this.min, this.valueStart))
      : this.min;
    const disabled = this.disabled || this.#formDisabled;

    this.#syncInput(input, value, disabled, this.range ? "Maximum" : "Slider");
    if (startInput) {
      this.#syncInput(startInput, valueStart, disabled, "Minimum");
    }

    const progressStart =
      rangeSize > 0 ? (valueStart - this.min) / rangeSize : 0;
    const progressEnd = rangeSize > 0 ? (value - this.min) / rangeSize : 0;
    const segmentSize =
      rangeSize > 0 && this.step > 0 ? Math.min(this.step / rangeSize, 1) : 1;

    this.style.setProperty(
      "--ore-slider-progress-start",
      String(progressStart),
    );
    this.style.setProperty("--ore-slider-progress-end", String(progressEnd));
    this.style.setProperty(
      "--ore-slider-segment-size",
      `${segmentSize * 100}%`,
    );
    this.#internals.setFormValue(
      this.range ? `${valueStart},${value}` : String(value),
    );

    if (value !== this.value) {
      this.value = value;
    }
    if (this.range && valueStart !== this.valueStart) {
      this.valueStart = valueStart;
    }
  }

  #syncInput(
    input: HTMLInputElement,
    value: number,
    disabled: boolean,
    fallbackLabel: string,
  ): void {
    input.disabled = disabled;
    input.min = String(this.min);
    input.max = String(this.max);
    input.step = String(this.step);
    input.value = String(value);
    input.setAttribute("aria-orientation", this.orientation);
    input.setAttribute(
      "aria-label",
      this.getAttribute(
        fallbackLabel === "Minimum" ? "aria-label-start" : "aria-label",
      ) ??
        this.#internals.labels.item(0)?.textContent?.trim() ??
        fallbackLabel,
    );
  }

  readonly #handleInput = (event: Event): void => {
    event.stopPropagation();
    const target = event.currentTarget as HTMLInputElement;
    const startInput = this.startInput;

    if (target === startInput) {
      this.valueStart = Math.min(target.valueAsNumber, this.value);
    } else {
      this.value = Math.max(
        this.input?.valueAsNumber ?? this.value,
        this.range ? this.valueStart : this.min,
      );
    }
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
