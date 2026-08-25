import { type PropertyValues, ReactiveElement } from "lit";

import "../components/spinner/spinner.js";

export type LegacyButtonType = "button" | "reset" | "submit";

export class LegacyButton extends ReactiveElement {
  static formAssociated = true;

  static properties = {
    color: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    download: { type: String, reflect: true },
    href: { type: String, reflect: true },
    loading: { type: Boolean, reflect: true },
    name: { type: String, reflect: true },
    rel: { type: String, reflect: true },
    target: { type: String, reflect: true },
    type: { type: String, reflect: true },
    value: { type: String, reflect: true },
    variant: { type: String, reflect: true },
  };

  declare color: string;
  declare disabled: boolean;
  declare download: string | undefined;
  declare href: string | undefined;
  declare loading: boolean;
  declare name: string;
  declare rel: string | undefined;
  declare target: string | undefined;
  declare type: LegacyButtonType;
  declare value: string;
  declare variant: string;

  readonly #internals = this.attachInternals();
  #formDisabled = false;
  #tabIndex = 0;

  constructor() {
    super();
    this.disabled = false;
    this.loading = false;
    this.name = "";
    this.type = "button";
    this.value = "";
    this.variant = "default";
  }

  override connectedCallback(): void {
    super.connectedCallback();

    if (!this.hasAttribute("tabindex")) {
      this.tabIndex = 0;
    }

    this.addEventListener("click", this.#handleClick);
    this.addEventListener("keydown", this.#handleKeyDown);
    this.addEventListener("keyup", this.#handleKeyUp);
    this.addEventListener("pointerdown", this.#handlePointerDown);
    this.addEventListener("blur", this.#releasePress);
    this.#syncAccessibility();
  }

  override disconnectedCallback(): void {
    this.removeEventListener("click", this.#handleClick);
    this.removeEventListener("keydown", this.#handleKeyDown);
    this.removeEventListener("keyup", this.#handleKeyUp);
    this.removeEventListener("pointerdown", this.#handlePointerDown);
    this.removeEventListener("blur", this.#releasePress);
    this.#releasePress();
    super.disconnectedCallback();
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has("disabled") || changed.has("loading")) {
      this.#syncAccessibility();
    }
  }

  formDisabledCallback(disabled: boolean): void {
    this.#formDisabled = disabled;
    this.toggleAttribute("form-disabled", disabled);
    this.#syncAccessibility();
  }

  #isUnavailable(): boolean {
    return this.disabled || this.#formDisabled || this.loading;
  }

  #syncAccessibility(): void {
    const disabled = this.disabled || this.#formDisabled;
    this.setAttribute("role", "button");
    this.setAttribute("aria-disabled", String(disabled));

    if (disabled) {
      if (this.tabIndex >= 0) {
        this.#tabIndex = this.tabIndex;
      }
      this.tabIndex = -1;
    } else if (this.tabIndex < 0) {
      this.tabIndex = this.#tabIndex;
    }
  }

  readonly #handleClick = (event: MouseEvent): void => {
    if (this.#isUnavailable()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    if (this.type === "reset") {
      this.#internals.form?.reset();
    } else if (this.type !== "button") {
      if (this.name) {
        this.#internals.setFormValue(this.value);
      }
      this.#internals.form?.requestSubmit();
      this.#internals.setFormValue(null);
    }
  };

  readonly #handleKeyDown = (event: KeyboardEvent): void => {
    if (this.#isUnavailable()) {
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      this.click();
    } else if (event.key === " ") {
      event.preventDefault();
      this.setAttribute("pressed", "");
    }
  };

  readonly #handleKeyUp = (event: KeyboardEvent): void => {
    if (!this.#isUnavailable() && event.key === " ") {
      event.preventDefault();
      this.#releasePress();
      this.click();
    }
  };

  readonly #handlePointerDown = (event: PointerEvent): void => {
    if (this.#isUnavailable() || event.button !== 0) {
      return;
    }

    this.setAttribute("pressed", "");
    window.addEventListener("pointerup", this.#releasePress, { once: true });
    window.addEventListener("pointercancel", this.#releasePress, {
      once: true,
    });
  };

  readonly #releasePress = (): void => {
    this.removeAttribute("pressed");
    window.removeEventListener("pointerup", this.#releasePress);
    window.removeEventListener("pointercancel", this.#releasePress);
  };
}
