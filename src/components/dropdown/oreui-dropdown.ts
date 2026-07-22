import { LitElement, css, html, nothing } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import "../icon/oreui-icon.js";

export interface OreUIDropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@customElement("oreui-option")
export class OreUIOption extends LitElement {
  @property()
  value = "";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  protected render() {
    return html`<slot></slot>`;
  }
}

@customElement("oreui-dropdown")
export class OreUIDropdown extends LitElement {
  static formAssociated = true;

  static styles = css`
    :host {
      display: inline-block;
      min-inline-size: 12rem;
      color: var(--oreui-color-ink, #1e1e1f);
      font-family: var(--oreui-font-family, "Minecraft", monospace);
      vertical-align: middle;
    }

    .root {
      position: relative;
    }

    button,
    .option {
      box-sizing: border-box;
      inline-size: 100%;
      border: var(--oreui-dropdown-border-width, 4px) solid
        var(--oreui-color-ink, #1e1e1f);
      border-radius: 0;
      font: inherit;
      text-align: start;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-block-size: var(--oreui-dropdown-height, 126px);
      padding: var(--oreui-dropdown-padding-block, 12px)
        var(--oreui-dropdown-padding-inline, 24px)
        var(--oreui-dropdown-padding-block, 12px)
        var(--oreui-dropdown-padding-start, 12px);
      background: var(--oreui-color-dropdown-surface, #48494a);
      box-shadow: inset 0 0 0 var(--oreui-dropdown-accent-width, 4px)
        transparent;
      color: var(--oreui-color-dropdown-text, #ffffff);
      cursor: pointer;
      outline: 0;
    }

    button:hover:not(:disabled) {
      background: var(--oreui-color-dropdown-hover, #2f2f2f);
    }

    button:focus-visible,
    button[aria-expanded="true"] {
      box-shadow: inset 0 0 0 var(--oreui-dropdown-accent-width, 4px)
        var(--oreui-color-dropdown-focus, #b1b2b5);
    }

    button:disabled {
      background: var(--oreui-color-dropdown-disabled, #b1b2b5);
      color: color-mix(
        in srgb,
        var(--oreui-color-ink, #1e1e1f) 50%,
        transparent
      );
      cursor: not-allowed;
    }

    .value {
      min-inline-size: 0;
      overflow: hidden;
      font-size: var(--oreui-dropdown-font-size, 32px);
      line-height: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .placeholder {
      color: var(--oreui-color-dropdown-placeholder, #b1b2b5);
    }

    oreui-icon {
      flex: none;
      inline-size: var(--oreui-dropdown-icon-size, 32px);
      block-size: var(--oreui-dropdown-icon-size, 32px);
      margin-inline-start: var(--oreui-dropdown-icon-gap, 24px);
      color: currentColor;
    }

    .listbox {
      position: fixed;
      z-index: var(--oreui-dropdown-z-index, 1000);
      box-sizing: border-box;
      inset-block-start: var(--oreui-dropdown-list-top);
      inset-inline-start: var(--oreui-dropdown-list-left);
      inline-size: var(--oreui-dropdown-list-width);
      max-block-size: var(--oreui-dropdown-list-max-height, 378px);
      margin: 0;
      padding: 0;
      overflow-y: auto;
      border: var(--oreui-dropdown-border-width, 4px) solid
        var(--oreui-color-ink, #1e1e1f);
      background: var(--oreui-color-ink, #1e1e1f);
      box-shadow: 0 var(--oreui-dropdown-shadow-offset, 8px) 0
        color-mix(in srgb, var(--oreui-color-ink, #1e1e1f) 45%, transparent);
      list-style: none;
    }

    .option {
      display: flex;
      align-items: center;
      min-block-size: var(--oreui-dropdown-option-height, 126px);
      padding: var(--oreui-dropdown-padding-block, 12px)
        var(--oreui-dropdown-padding-inline, 24px)
        var(--oreui-dropdown-padding-block, 12px)
        var(--oreui-dropdown-padding-start, 12px);
      border-inline: 0;
      border-block-start: 0;
      background: var(--oreui-color-dropdown-surface, #48494a);
      color: var(--oreui-color-dropdown-text, #ffffff);
      font-size: var(--oreui-dropdown-font-size, 32px);
      line-height: 1;
      cursor: pointer;
    }

    .option:hover:not([aria-disabled="true"]),
    .option.active:not([aria-disabled="true"]) {
      background: var(--oreui-color-dropdown-hover, #2f2f2f);
      box-shadow: inset 0 0 0 var(--oreui-dropdown-accent-width, 4px)
        var(--oreui-color-dropdown-focus, #b1b2b5);
    }

    .option.selected {
      background: var(--oreui-color-dropdown-selected, #6d6d6e);
    }

    .option[aria-disabled="true"] {
      color: var(--oreui-color-dropdown-placeholder, #b1b2b5);
      cursor: not-allowed;
    }

    .empty,
    .source {
      cursor: default;
    }

    .source {
      display: none;
    }
  `;

  private readonly internals = this.attachInternals();
  private initialValue = "";
  private resizeObserver?: ResizeObserver;

  @property()
  value = "";

  @property({ reflect: true })
  name = "";

  @property()
  placeholder = "Select an option";

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ attribute: false })
  options: OreUIDropdownOption[] = [];

  @state()
  private slottedOptions: OreUIDropdownOption[] = [];

  @state()
  private open = false;

  @state()
  private activeIndex = -1;

  @state()
  private listStyle = "";

  @queryAssignedElements({ selector: "oreui-option" })
  private optionElements!: OreUIOption[];

  override focus(options?: FocusOptions) {
    this.buttonElement?.focus(options);
  }

  override firstUpdated() {
    this.initialValue = this.value;
    this.readSlottedOptions();
    this.syncFormState();
    this.resizeObserver = new ResizeObserver(() => this.positionListbox());
    this.resizeObserver.observe(this);
  }

  override updated() {
    this.syncFormState();
    if (this.open) {
      this.positionListbox();
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeGlobalListeners();
    this.resizeObserver?.disconnect();
  }

  formResetCallback() {
    this.value = this.initialValue;
    this.closeListbox();
  }

  formStateRestoreCallback(state: string | File | FormData | null) {
    if (typeof state === "string") {
      this.value = state;
    }
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
    if (disabled) {
      this.closeListbox();
    }
  }

  checkValidity() {
    return this.internals.checkValidity();
  }

  reportValidity() {
    return this.internals.reportValidity();
  }

  protected render() {
    const options = this.availableOptions;
    const selected = options.find((option) => option.value === this.value);
    const activeId =
      this.open && this.activeIndex >= 0
        ? `oreui-dropdown-option-${this.activeIndex}`
        : nothing;

    return html`
      <div class="root">
        <button
          id="trigger"
          part="trigger"
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-controls="listbox"
          aria-expanded=${this.open ? "true" : "false"}
          aria-activedescendant=${activeId}
          aria-required=${this.required ? "true" : "false"}
          aria-invalid=${this.required && !this.value ? "true" : "false"}
          ?disabled=${this.disabled}
          @click=${this.toggleListbox}
          @keydown=${this.handleKeydown}
        >
          <span class=${selected ? "value" : "value placeholder"}>
            ${selected?.label || this.placeholder}
          </span>
          <oreui-icon
            name=${this.open ? "chevron-up" : "chevron-down"}
            size="32"
          ></oreui-icon>
        </button>
        ${
          this.open
            ? html`
                <ul
                  id="listbox"
                  class="listbox"
                  part="listbox"
                  role="listbox"
                  style=${this.listStyle}
                >
                  ${
                    options.length
                      ? options.map((option, index) =>
                          this.renderOption(option, index),
                        )
                      : html`<li class="option empty" aria-disabled="true">
                          No options
                        </li>`
                  }
                </ul>
              `
            : nothing
        }
        <span class="source">
          <slot @slotchange=${this.readSlottedOptions}></slot>
        </span>
      </div>
    `;
  }

  private get availableOptions() {
    return this.options.length ? this.options : this.slottedOptions;
  }

  private get buttonElement() {
    return this.renderRoot.querySelector<HTMLButtonElement>("button");
  }

  private renderOption(option: OreUIDropdownOption, index: number) {
    return html`
      <li
        id=${`oreui-dropdown-option-${index}`}
        class=${`option${index === this.activeIndex ? " active" : ""}${
          option.value === this.value ? " selected" : ""
        }`}
        part="option"
        role="option"
        aria-selected=${option.value === this.value ? "true" : "false"}
        aria-disabled=${option.disabled ? "true" : "false"}
        @pointermove=${() => this.setActiveIndex(index)}
        @click=${() => this.selectOption(index)}
      >
        ${option.label}
      </li>
    `;
  }

  private readSlottedOptions = () => {
    this.slottedOptions = this.optionElements.map((option) => ({
      value: option.value || option.textContent?.trim() || "",
      label: option.textContent?.trim() || option.value,
      disabled: option.disabled,
    }));
  };

  private toggleListbox = () => {
    if (this.open) {
      this.closeListbox();
    } else {
      this.openListbox();
    }
  };

  private openListbox(preferredIndex?: number) {
    if (this.disabled) {
      return;
    }

    const selectedIndex = this.availableOptions.findIndex(
      (option) => option.value === this.value && !option.disabled,
    );
    this.activeIndex =
      preferredIndex ??
      (selectedIndex >= 0 ? selectedIndex : this.findEnabledIndex(0, 1));
    this.open = true;
    document.addEventListener("pointerdown", this.handleDocumentPointerDown);
    window.addEventListener("resize", this.positionListbox);
    window.addEventListener("scroll", this.positionListbox, true);
    void this.updateComplete.then(() => {
      this.positionListbox();
      this.scrollActiveOptionIntoView();
    });
  }

  private closeListbox() {
    this.open = false;
    this.activeIndex = -1;
    this.removeGlobalListeners();
  }

  private removeGlobalListeners() {
    document.removeEventListener("pointerdown", this.handleDocumentPointerDown);
    window.removeEventListener("resize", this.positionListbox);
    window.removeEventListener("scroll", this.positionListbox, true);
  }

  private handleDocumentPointerDown = (event: PointerEvent) => {
    if (!event.composedPath().includes(this)) {
      this.closeListbox();
    }
  };

  private handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Tab") {
      this.closeListbox();
      return;
    }

    if (event.key === "Escape" && this.open) {
      event.preventDefault();
      this.closeListbox();
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (this.open && this.activeIndex >= 0) {
        this.selectOption(this.activeIndex);
      } else {
        this.openListbox();
      }
      return;
    }

    const direction =
      event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
    if (direction) {
      event.preventDefault();
      if (!this.open) {
        this.openListbox();
      } else {
        this.moveActiveIndex(direction);
      }
      return;
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      if (!this.open) {
        this.openListbox();
      }
      const start = event.key === "Home" ? 0 : this.availableOptions.length - 1;
      this.setActiveIndex(
        this.findEnabledIndex(start, event.key === "Home" ? 1 : -1),
      );
    }
  };

  private moveActiveIndex(direction: 1 | -1) {
    const count = this.availableOptions.length;
    if (!count) {
      return;
    }

    for (let offset = 1; offset <= count; offset += 1) {
      const index = (this.activeIndex + direction * offset + count) % count;
      if (!this.availableOptions[index]?.disabled) {
        this.setActiveIndex(index);
        return;
      }
    }
  }

  private findEnabledIndex(start: number, direction: 1 | -1) {
    for (
      let index = start;
      index >= 0 && index < this.availableOptions.length;
      index += direction
    ) {
      if (!this.availableOptions[index]?.disabled) {
        return index;
      }
    }
    return -1;
  }

  private setActiveIndex(index: number) {
    if (index < 0 || this.availableOptions[index]?.disabled) {
      return;
    }
    this.activeIndex = index;
    void this.updateComplete.then(() => this.scrollActiveOptionIntoView());
  }

  private scrollActiveOptionIntoView() {
    this.renderRoot
      .querySelector<HTMLElement>(`#oreui-dropdown-option-${this.activeIndex}`)
      ?.scrollIntoView({ block: "nearest" });
  }

  private selectOption(index: number) {
    const option = this.availableOptions[index];
    if (!option || option.disabled) {
      return;
    }

    const changed = this.value !== option.value;
    this.value = option.value;
    this.closeListbox();
    this.buttonElement?.focus();
    this.syncFormState();

    if (changed) {
      this.dispatchEvent(
        new InputEvent("input", { bubbles: true, composed: true }),
      );
      this.dispatchEvent(
        new Event("change", { bubbles: true, composed: true }),
      );
    }
  }

  private positionListbox = () => {
    if (!this.open || !this.buttonElement) {
      return;
    }

    const rect = this.buttonElement.getBoundingClientRect();
    const gap = 4;
    const viewportGap = 8;
    const spaceBelow = window.innerHeight - rect.bottom - viewportGap;
    const spaceAbove = rect.top - viewportGap;
    const opensAbove = spaceBelow < 126 && spaceAbove > spaceBelow;
    const availableHeight = Math.max(126, opensAbove ? spaceAbove : spaceBelow);
    const maxHeight = Math.min(378, availableHeight - gap);
    const top = opensAbove
      ? Math.max(viewportGap, rect.top - maxHeight - gap)
      : rect.bottom + gap;
    const left = Math.max(
      viewportGap,
      Math.min(rect.left, window.innerWidth - rect.width - viewportGap),
    );
    const width = Math.min(rect.width, window.innerWidth - viewportGap * 2);

    this.listStyle = [
      `--oreui-dropdown-list-top: ${Math.round(top)}px`,
      `--oreui-dropdown-list-left: ${Math.round(left)}px`,
      `--oreui-dropdown-list-width: ${Math.round(width)}px`,
      `--oreui-dropdown-list-max-height: ${Math.round(maxHeight)}px`,
    ].join(";");
  };

  private syncFormState() {
    this.internals.setFormValue(this.disabled ? null : this.value, this.value);
    const anchor = this.buttonElement;
    if (this.required && !this.value) {
      this.internals.setValidity(
        { valueMissing: true },
        "Please select an option.",
        anchor ?? undefined,
      );
    } else {
      this.internals.setValidity({});
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "oreui-dropdown": OreUIDropdown;
    "oreui-option": OreUIOption;
  }
}
