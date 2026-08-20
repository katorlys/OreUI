import { type PropertyValues, ReactiveElement } from "lit";

import "../spinner/spinner.js";

export type OreButtonType = "button" | "reset" | "submit";
export type OreButtonColor =
  | "destructive"
  | "dungeons"
  | "gold"
  | "legends"
  | "primary"
  | "realms"
  | "secondary";
export type OreButtonVariant = "default" | "hero";

export class OreButton extends ReactiveElement {
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

  declare disabled: boolean;
  declare color: OreButtonColor;
  declare download: string | undefined;
  declare href: string | undefined;
  declare loading: boolean;
  declare name: string;
  declare rel: string | undefined;
  declare target: string | undefined;
  declare type: OreButtonType;
  declare value: string;
  declare variant: OreButtonVariant;

  readonly #internals = this.attachInternals();
  readonly #contentObserver = new MutationObserver((records) => {
    if (records.some((record) => record.target !== this.#link)) {
      this.#syncLink();
    }
  });
  #formDisabled = false;
  #link: HTMLAnchorElement | undefined;
  #spinner: HTMLElement | undefined;
  #tabIndex = 0;

  constructor() {
    super();
    this.color = "primary";
    this.disabled = false;
    this.loading = false;
    this.name = "";
    this.type = "button";
    this.value = "";
    this.variant = "default";
  }

  get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  override click(): void {
    if (this.href !== undefined) {
      this.#syncLink();
      this.#link?.click();
    } else {
      super.click();
    }
  }

  override focus(options?: FocusOptions): void {
    if (this.href !== undefined) {
      this.#syncLink();
      this.#link?.focus(options);
    } else {
      super.focus(options);
    }
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
    this.#contentObserver.observe(this, {
      attributeFilter: ["aria-label"],
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    });
    this.#syncAccessibility();
  }

  override disconnectedCallback(): void {
    this.removeEventListener("click", this.#handleClick);
    this.removeEventListener("keydown", this.#handleKeyDown);
    this.removeEventListener("keyup", this.#handleKeyUp);
    this.removeEventListener("pointerdown", this.#handlePointerDown);
    this.removeEventListener("blur", this.#releasePress);
    this.#contentObserver.disconnect();
    this.#releasePress();
    super.disconnectedCallback();
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (
      changed.has("disabled") ||
      changed.has("download") ||
      changed.has("href") ||
      changed.has("loading") ||
      changed.has("rel") ||
      changed.has("target")
    ) {
      this.#syncAccessibility();
    }
  }

  formDisabledCallback(disabled: boolean): void {
    this.#formDisabled = disabled;
    this.toggleAttribute("form-disabled", disabled);
    this.#syncAccessibility();
  }

  #isDisabled(): boolean {
    return this.disabled || this.#formDisabled;
  }

  #isUnavailable(): boolean {
    return this.#isDisabled() || this.loading;
  }

  #syncAccessibility(): void {
    const disabled = this.#isDisabled();
    const isLink = this.href !== undefined;

    this.setAttribute("role", isLink ? "presentation" : "button");
    if (isLink) {
      this.removeAttribute("aria-disabled");
    } else {
      this.setAttribute("aria-disabled", String(disabled));
    }

    if (disabled || isLink) {
      if (this.tabIndex >= 0) {
        this.#tabIndex = this.tabIndex;
      }
      this.tabIndex = -1;
    } else if (this.tabIndex < 0) {
      this.tabIndex = this.#tabIndex;
    }

    this.#syncLink();
    this.#syncSpinner();
  }

  #syncSpinner(): void {
    if (!this.loading) {
      this.#spinner?.remove();
      this.#spinner = undefined;
      this.removeAttribute("aria-busy");
      return;
    }

    if (!this.#spinner) {
      this.#spinner = document.createElement("ore-spinner");
      this.#spinner.className = "ore-button-spinner";
      this.#spinner.setAttribute("aria-hidden", "true");
      this.append(this.#spinner);
    }

    this.setAttribute("aria-busy", "true");
  }

  #syncLink(): void {
    if (this.href === undefined) {
      this.#link?.remove();
      this.#link = undefined;
      return;
    }

    if (!this.#link) {
      this.#link = document.createElement("a");
      this.#link.className = "ore-button-link";
      this.#link.addEventListener("click", this.#handleLinkClick);
      this.append(this.#link);
    }

    this.#link.href = this.href;
    this.#setLinkAttribute("download", this.download);
    this.#setLinkAttribute("rel", this.rel);
    this.#setLinkAttribute("target", this.target);
    this.#link.setAttribute(
      "aria-label",
      this.getAttribute("aria-label") ?? this.#getLinkLabel(),
    );
    this.#link.setAttribute("aria-disabled", String(this.#isDisabled()));
    if (this.loading) {
      this.#link.setAttribute("aria-busy", "true");
    } else {
      this.#link.removeAttribute("aria-busy");
    }
    this.#link.tabIndex = this.#isDisabled() ? -1 : 0;
  }

  #getLinkLabel(): string {
    return Array.from(this.childNodes)
      .filter((node) => node !== this.#link)
      .map((node) => node.textContent)
      .join("")
      .trim();
  }

  #setLinkAttribute(name: string, value: string | undefined): void {
    if (value === undefined) {
      this.#link?.removeAttribute(name);
    } else {
      this.#link?.setAttribute(name, value);
    }
  }

  readonly #handleClick = (event: MouseEvent): void => {
    if (this.#isUnavailable()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    if (this.href !== undefined) {
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
    if (this.#isUnavailable() || this.href !== undefined) {
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
    if (
      !this.#isUnavailable() &&
      this.href === undefined &&
      event.key === " "
    ) {
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

  readonly #handleLinkClick = (event: MouseEvent): void => {
    if (this.#isUnavailable()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  readonly #releasePress = (): void => {
    this.removeAttribute("pressed");
    window.removeEventListener("pointerup", this.#releasePress);
    window.removeEventListener("pointercancel", this.#releasePress);
  };
}

if (!customElements.get("ore-button")) {
  customElements.define("ore-button", OreButton);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-button": OreButton;
  }
}
