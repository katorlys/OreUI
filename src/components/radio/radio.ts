import { type PropertyValues, ReactiveElement } from "lit";

export class OreRadio extends ReactiveElement {
  static formAssociated = true;

  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    name: { type: String, reflect: true },
    required: { type: Boolean, reflect: true },
    value: { type: String },
  };

  declare checked: boolean;
  declare disabled: boolean;
  declare name: string;
  declare required: boolean;
  declare value: string;

  readonly #internals = this.attachInternals();
  #defaultChecked = false;
  #formDisabled = false;

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.name = "";
    this.required = false;
    this.value = "on";
  }

  get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  get labels(): NodeList {
    return this.#internals.labels;
  }

  get validity(): ValidityState {
    return this.#internals.validity;
  }

  get validationMessage(): string {
    return this.#internals.validationMessage;
  }

  get willValidate(): boolean {
    return this.#internals.willValidate;
  }

  checkValidity(): boolean {
    return this.#internals.checkValidity();
  }

  reportValidity(): boolean {
    return this.#internals.reportValidity();
  }

  override connectedCallback(): void {
    this.#defaultChecked = this.hasAttribute("checked");
    super.connectedCallback();
    this.addEventListener("click", this.#handleClick);
    this.addEventListener("keydown", this.#handleKeyDown);
    this.addEventListener("keyup", this.#handleKeyUp);
    this.addEventListener("pointerdown", this.#handlePointerDown);
    this.addEventListener("blur", this.#releasePress);
    this.#syncGroup();
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
    if (
      changed.has("checked") ||
      changed.has("disabled") ||
      changed.has("name") ||
      changed.has("required") ||
      changed.has("value")
    ) {
      this.#syncGroup();
    }
  }

  formDisabledCallback(disabled: boolean): void {
    this.#formDisabled = disabled;
    this.toggleAttribute("form-disabled", disabled);
    this.#syncGroup();
  }

  formResetCallback(): void {
    this.checked = this.#defaultChecked;
    this.#syncGroup();
  }

  #isDisabled(): boolean {
    return this.disabled || this.#formDisabled;
  }

  #group(): OreRadio[] {
    if (!this.name) {
      return [this];
    }

    const root = this.getRootNode() as Document | ShadowRoot;

    return [...root.querySelectorAll<OreRadio>("ore-radio")].filter(
      (radio) => radio.name === this.name && radio.form === this.form,
    );
  }

  #syncGroup(): void {
    const group = this.#group();

    if (this.checked) {
      for (const radio of group) {
        if (radio !== this && radio.checked) {
          radio.checked = false;
        }
      }
    }

    const enabled = group.filter((radio) => !radio.#isDisabled());
    const selected = enabled.find((radio) => radio.checked) ?? enabled[0];
    const valid =
      !group.some((radio) => radio.required) ||
      group.some((radio) => radio.checked);

    for (const radio of group) {
      const disabled = radio.#isDisabled();
      radio.setAttribute("role", "radio");
      radio.setAttribute("aria-checked", String(radio.checked));
      radio.setAttribute("aria-disabled", String(disabled));
      radio.setAttribute("aria-required", String(radio.required));
      radio.tabIndex = !disabled && radio === selected ? 0 : -1;
      radio.#internals.setFormValue(radio.checked ? radio.value : null);
      radio.#internals.setValidity(
        valid ? {} : { valueMissing: true },
        valid ? "" : "Please select one of these options.",
      );
    }
  }

  #select(): void {
    if (this.checked) {
      return;
    }

    this.checked = true;
    this.#syncGroup();
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  #move(offset: number): void {
    const enabled = this.#group().filter((radio) => !radio.#isDisabled());
    const index = enabled.indexOf(this);
    const next = enabled[(index + offset + enabled.length) % enabled.length];

    if (next) {
      next.focus();
      next.#select();
    }
  }

  readonly #handleClick = (event: MouseEvent): void => {
    if (this.#isDisabled()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    this.#select();
  };

  readonly #handleKeyDown = (event: KeyboardEvent): void => {
    if (this.#isDisabled()) {
      return;
    }

    if (event.key === " ") {
      event.preventDefault();
      this.setAttribute("pressed", "");
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      this.#move(1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      this.#move(-1);
    }
  };

  readonly #handleKeyUp = (event: KeyboardEvent): void => {
    if (!this.#isDisabled() && event.key === " ") {
      event.preventDefault();
      this.#releasePress();
      this.click();
    }
  };

  readonly #handlePointerDown = (event: PointerEvent): void => {
    if (this.#isDisabled() || event.button !== 0) {
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

if (!customElements.get("ore-radio")) {
  customElements.define("ore-radio", OreRadio);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-radio": OreRadio;
  }
}
