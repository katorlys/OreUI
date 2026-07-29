import { type PropertyValues, ReactiveElement } from "lit";

export class OreTextfield extends ReactiveElement {
  static formAssociated = true;

  static properties = {
    autocomplete: { type: String, reflect: true },
    description: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    error: { type: String, reflect: true },
    inputMode: { type: String, attribute: "inputmode", reflect: true },
    label: { type: String, reflect: true },
    list: { type: String, reflect: true },
    max: { type: String, reflect: true },
    maxLength: { type: Number, attribute: "maxlength", reflect: true },
    min: { type: String, reflect: true },
    minLength: { type: Number, attribute: "minlength", reflect: true },
    name: { type: String, reflect: true },
    pattern: { type: String, reflect: true },
    placeholder: { type: String, reflect: true },
    readonly: { type: Boolean, reflect: true },
    required: { type: Boolean, reflect: true },
    step: { type: String, reflect: true },
    type: { type: String, reflect: true },
    value: { type: String },
  };

  declare autocomplete: string;
  declare description: string;
  declare disabled: boolean;
  declare error: string;
  declare inputMode: string;
  declare label: string;
  declare list: string;
  declare max: string;
  declare maxLength: number;
  declare min: string;
  declare minLength: number;
  declare name: string;
  declare pattern: string;
  declare placeholder: string;
  declare readonly: boolean;
  declare required: boolean;
  declare step: string;
  declare type: string;
  declare value: string;

  readonly #internals = this.attachInternals();
  #defaultValue = "";
  #formDisabled = false;

  constructor() {
    super();
    this.autocomplete = "";
    this.description = "";
    this.disabled = false;
    this.error = "";
    this.inputMode = "";
    this.label = "";
    this.list = "";
    this.max = "";
    this.maxLength = -1;
    this.min = "";
    this.minLength = -1;
    this.name = "";
    this.pattern = "";
    this.placeholder = "";
    this.readonly = false;
    this.required = false;
    this.step = "";
    this.type = "text";
    this.value = "";
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

  get input(): HTMLInputElement | null {
    return this.querySelector(":scope > .ore-textfield-control > input");
  }

  checkValidity(): boolean {
    return this.#internals.checkValidity();
  }

  reportValidity(): boolean {
    return this.#internals.reportValidity();
  }

  override connectedCallback(): void {
    this.#defaultValue = this.getAttribute("value") ?? this.value;
    super.connectedCallback();
    this.addEventListener("click", this.#handleClick);

    if (!this.input) {
      const label = document.createElement("label");
      const control = document.createElement("span");
      const input = document.createElement("input");
      const description = document.createElement("span");
      const error = document.createElement("span");
      const icon = this.querySelector<HTMLElement>(
        ":scope > .ore-textfield-icon",
      );

      label.className = "ore-textfield-label";
      control.className = "ore-textfield-control";
      input.className = "ore-textfield-input";
      input.defaultValue = this.#defaultValue;
      description.className = "ore-textfield-description";
      error.className = "ore-textfield-error";
      error.setAttribute("aria-live", "polite");
      control.append(...(icon ? [icon, input] : [input]));
      this.append(label, control, description, error);
      label.addEventListener("click", () => input.focus());
      input.addEventListener("input", this.#handleInput);
    }

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
      changed.has("autocomplete") ||
      changed.has("description") ||
      changed.has("disabled") ||
      changed.has("error") ||
      changed.has("inputMode") ||
      changed.has("label") ||
      changed.has("list") ||
      changed.has("max") ||
      changed.has("maxLength") ||
      changed.has("min") ||
      changed.has("minLength") ||
      changed.has("pattern") ||
      changed.has("placeholder") ||
      changed.has("readonly") ||
      changed.has("required") ||
      changed.has("step") ||
      changed.has("type") ||
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

  #sync(): void {
    const input = this.input;
    const label = this.querySelector<HTMLElement>(
      ":scope > .ore-textfield-label",
    );
    const description = this.querySelector<HTMLElement>(
      ":scope > .ore-textfield-description",
    );
    const error = this.querySelector<HTMLElement>(
      ":scope > .ore-textfield-error",
    );

    if (!input || !label || !description || !error) {
      return;
    }

    const disabled = this.disabled || this.#formDisabled;

    label.textContent = this.label;
    label.hidden = !this.label;
    description.textContent = this.description;
    description.hidden = !this.description;
    input.disabled = disabled;
    input.inputMode = this.inputMode;
    input.placeholder = this.placeholder;
    input.readOnly = this.readonly;
    input.required = this.required;
    input.type = this.type;
    input.value = this.value;

    if (this.autocomplete) {
      input.setAttribute("autocomplete", this.autocomplete);
    } else {
      input.removeAttribute("autocomplete");
    }

    if (this.list) {
      input.setAttribute("list", this.list);
    } else {
      input.removeAttribute("list");
    }

    if (this.max) {
      input.max = this.max;
    } else {
      input.removeAttribute("max");
    }

    if (this.min) {
      input.min = this.min;
    } else {
      input.removeAttribute("min");
    }

    if (this.maxLength >= 0) {
      input.maxLength = this.maxLength;
    } else {
      input.removeAttribute("maxlength");
    }

    if (this.minLength >= 0) {
      input.minLength = this.minLength;
    } else {
      input.removeAttribute("minlength");
    }

    if (this.pattern) {
      input.pattern = this.pattern;
    } else {
      input.removeAttribute("pattern");
    }

    if (this.step) {
      input.step = this.step;
    } else {
      input.removeAttribute("step");
    }

    input.setCustomValidity(this.error);
    input.setAttribute(
      "aria-label",
      this.getAttribute("aria-label") || this.label || "Text field",
    );
    const describedBy: string[] = [];

    if (this.description) {
      const id =
        description.id || `ore-textfield-description-${crypto.randomUUID()}`;
      description.id = id;
      describedBy.push(id);
    }

    const invalid = !input.validity.valid;
    const errorMessage = invalid ? input.validationMessage : "";

    error.textContent = errorMessage;
    error.hidden = !errorMessage;
    if (errorMessage) {
      const id = error.id || `ore-textfield-error-${crypto.randomUUID()}`;
      error.id = id;
      describedBy.push(id);
    }

    if (describedBy.length > 0) {
      input.setAttribute("aria-describedby", describedBy.join(" "));
    } else {
      input.removeAttribute("aria-describedby");
    }

    input.setAttribute("aria-invalid", String(invalid));

    this.#internals.setFormValue(this.value);
    this.#internals.setValidity(input.validity, input.validationMessage, input);
    this.setAttribute("aria-disabled", String(disabled));
    this.setAttribute("aria-invalid", String(invalid));
  }

  readonly #handleInput = (event: Event): void => {
    event.stopPropagation();
    this.value = this.input?.value ?? this.value;
    this.#sync();
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  };

  readonly #handleClick = (event: MouseEvent): void => {
    if (event.target === this && !this.input?.disabled) {
      this.input?.focus();
    }
  };
}

if (!customElements.get("ore-textfield")) {
  customElements.define("ore-textfield", OreTextfield);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-textfield": OreTextfield;
  }
}
