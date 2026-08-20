import { type PropertyValues, ReactiveElement } from "lit";

export type OreTextareaWrap = "hard" | "off" | "soft";

export class OreTextarea extends ReactiveElement {
  static formAssociated = true;

  static properties = {
    autocomplete: { type: String, reflect: true },
    description: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    error: { type: String, reflect: true },
    inputMode: { type: String, attribute: "inputmode", reflect: true },
    label: { type: String, reflect: true },
    maxLength: { type: Number, attribute: "maxlength", reflect: true },
    minLength: { type: Number, attribute: "minlength", reflect: true },
    name: { type: String, reflect: true },
    placeholder: { type: String, reflect: true },
    readonly: { type: Boolean, reflect: true },
    required: { type: Boolean, reflect: true },
    rows: { type: Number, reflect: true },
    spellCheck: {
      attribute: "spellcheck",
      converter: {
        fromAttribute: (value: string | null) => value !== "false",
        toAttribute: (value: boolean) => String(value),
      },
      reflect: true,
    },
    value: { type: String },
    wrap: { type: String, reflect: true },
  };

  declare autocomplete: string;
  declare description: string;
  declare disabled: boolean;
  declare error: string;
  declare inputMode: string;
  declare label: string;
  declare maxLength: number;
  declare minLength: number;
  declare name: string;
  declare placeholder: string;
  declare readonly: boolean;
  declare required: boolean;
  declare rows: number;
  declare spellCheck: boolean;
  declare value: string;
  declare wrap: OreTextareaWrap;

  readonly #internals = this.attachInternals();
  #defaultValue = "";
  #formDisabled = false;
  readonly #resizeObserver = new ResizeObserver(() => this.#syncWidth());

  constructor() {
    super();
    this.autocomplete = "";
    this.description = "";
    this.disabled = false;
    this.error = "";
    this.inputMode = "";
    this.label = "";
    this.maxLength = -1;
    this.minLength = -1;
    this.name = "";
    this.placeholder = "";
    this.readonly = false;
    this.required = false;
    this.rows = 3;
    this.spellCheck = true;
    this.value = "";
    this.wrap = "soft";
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

  get textarea(): HTMLTextAreaElement | null {
    return this.querySelector(":scope > .ore-textarea-control > textarea");
  }

  get selectionStart(): number {
    return this.textarea?.selectionStart ?? 0;
  }

  set selectionStart(value: number) {
    if (this.textarea) {
      this.textarea.selectionStart = value;
    }
  }

  get selectionEnd(): number {
    return this.textarea?.selectionEnd ?? 0;
  }

  set selectionEnd(value: number) {
    if (this.textarea) {
      this.textarea.selectionEnd = value;
    }
  }

  get scrollTop(): number {
    return this.textarea?.scrollTop ?? 0;
  }

  set scrollTop(value: number) {
    if (this.textarea) {
      this.textarea.scrollTop = value;
    }
  }

  checkValidity(): boolean {
    return this.#internals.checkValidity();
  }

  reportValidity(): boolean {
    return this.#internals.reportValidity();
  }

  focus(options?: FocusOptions): void {
    this.textarea?.focus(options);
  }

  setSelectionRange(
    start: number,
    end: number,
    direction?: "backward" | "forward" | "none",
  ): void {
    this.textarea?.setSelectionRange(start, end, direction);
  }

  override connectedCallback(): void {
    this.#defaultValue = this.getAttribute("value") ?? this.value;
    super.connectedCallback();
    this.addEventListener("click", this.#handleClick);

    if (!this.textarea) {
      const label = document.createElement("label");
      const control = document.createElement("span");
      const textarea = document.createElement("textarea");
      const description = document.createElement("span");
      const error = document.createElement("span");

      label.className = "ore-textarea-label";
      control.className = "ore-textarea-control";
      textarea.className = "ore-textarea-input ore-scrollbar";
      textarea.defaultValue = this.#defaultValue;
      description.className = "ore-textarea-description";
      error.className = "ore-textarea-error";
      error.setAttribute("aria-live", "polite");
      control.append(textarea);
      this.append(label, control, description, error);
      label.addEventListener("click", () => textarea.focus());
      textarea.addEventListener("input", this.#handleInput);
      textarea.addEventListener("change", this.#handleChange);
    }

    if (this.textarea) {
      this.#resizeObserver.observe(this.textarea);
    }
    this.#sync();
  }

  override disconnectedCallback(): void {
    this.removeEventListener("click", this.#handleClick);
    this.#resizeObserver.disconnect();
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
      changed.has("maxLength") ||
      changed.has("minLength") ||
      changed.has("placeholder") ||
      changed.has("readonly") ||
      changed.has("required") ||
      changed.has("rows") ||
      changed.has("spellCheck") ||
      changed.has("value") ||
      changed.has("wrap")
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

  #syncWidth(): void {
    const textarea = this.textarea;
    const control = textarea?.parentElement;

    if (!textarea?.style.width || !control) {
      return;
    }

    const controlStyle = getComputedStyle(control);
    const horizontalPadding =
      parseFloat(controlStyle.paddingLeft) +
      parseFloat(controlStyle.paddingRight);

    this.style.width = `${textarea.getBoundingClientRect().width + horizontalPadding}px`;
  }

  #sync(): void {
    const textarea = this.textarea;
    const label = this.querySelector<HTMLElement>(
      ":scope > .ore-textarea-label",
    );
    const description = this.querySelector<HTMLElement>(
      ":scope > .ore-textarea-description",
    );
    const error = this.querySelector<HTMLElement>(
      ":scope > .ore-textarea-error",
    );

    if (!textarea || !label || !description || !error) {
      return;
    }

    const disabled = this.disabled || this.#formDisabled;

    label.textContent = this.label;
    label.hidden = !this.label;
    description.textContent = this.description;
    description.hidden = !this.description;
    textarea.disabled = disabled;
    textarea.inputMode = this.inputMode;
    textarea.placeholder = this.placeholder;
    textarea.readOnly = this.readonly;
    textarea.required = this.required;
    textarea.rows = Math.max(1, this.rows);
    textarea.spellcheck = this.spellCheck;
    textarea.value = this.value;
    textarea.wrap = this.wrap;

    if (this.autocomplete) {
      textarea.setAttribute("autocomplete", this.autocomplete);
    } else {
      textarea.removeAttribute("autocomplete");
    }

    if (this.maxLength >= 0) {
      textarea.maxLength = this.maxLength;
    } else {
      textarea.removeAttribute("maxlength");
    }

    if (this.minLength >= 0) {
      textarea.minLength = this.minLength;
    } else {
      textarea.removeAttribute("minlength");
    }

    textarea.setCustomValidity(this.error);
    textarea.setAttribute(
      "aria-label",
      this.getAttribute("aria-label") || this.label || "Text area",
    );
    const describedBy: string[] = [];

    if (this.description) {
      const id =
        description.id || `ore-textarea-description-${crypto.randomUUID()}`;
      description.id = id;
      describedBy.push(id);
    }

    const invalid = !textarea.validity.valid;
    const errorMessage = invalid ? textarea.validationMessage : "";

    error.textContent = errorMessage;
    error.hidden = !errorMessage;
    if (errorMessage) {
      const id = error.id || `ore-textarea-error-${crypto.randomUUID()}`;
      error.id = id;
      describedBy.push(id);
    }

    if (describedBy.length > 0) {
      textarea.setAttribute("aria-describedby", describedBy.join(" "));
    } else {
      textarea.removeAttribute("aria-describedby");
    }

    textarea.setAttribute("aria-invalid", String(invalid));
    this.#internals.setFormValue(this.value);
    this.#internals.setValidity(
      textarea.validity,
      textarea.validationMessage,
      textarea,
    );
    this.setAttribute("aria-disabled", String(disabled));
    this.setAttribute("aria-invalid", String(invalid));
  }

  readonly #handleInput = (event: Event): void => {
    event.stopPropagation();
    this.value = this.textarea?.value ?? this.value;
    this.#sync();
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  };

  readonly #handleChange = (event: Event): void => {
    event.stopPropagation();
    this.dispatchEvent(new Event("change", { bubbles: true }));
  };

  readonly #handleClick = (event: MouseEvent): void => {
    if (event.target === this && !this.textarea?.disabled) {
      this.focus();
    }
  };
}

if (!customElements.get("ore-textarea")) {
  customElements.define("ore-textarea", OreTextarea);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-textarea": OreTextarea;
  }
}
