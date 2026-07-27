import { type PropertyValues, ReactiveElement } from "lit";

export type OreDropdownVariant = "bordered" | "borderless";

export interface OreDropdownChangeDetail {
  item: HTMLElement;
  value: string;
}

let dropdownId = 0;

export class OreDropdown extends ReactiveElement {
  static properties = {
    defaultOpen: { type: Boolean, attribute: "default-open" },
    open: { type: Boolean, reflect: true },
    value: { type: String, reflect: true },
    variant: { type: String, reflect: true },
  };

  declare defaultOpen: boolean;
  declare open: boolean;
  declare value: string;
  declare variant: OreDropdownVariant;

  constructor() {
    super();
    this.defaultOpen = false;
    this.open = false;
    this.value = "";
    this.variant = "borderless";
  }

  get trigger(): HTMLElement | null {
    return this.querySelector(":scope > .ore-dropdown-trigger");
  }

  get menu(): HTMLElement | null {
    return this.querySelector(":scope > .ore-dropdown-menu");
  }

  get items(): HTMLElement[] {
    return [
      ...this.querySelectorAll<HTMLElement>(
        ":scope > .ore-dropdown-menu > .ore-dropdown-item",
      ),
    ];
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("click", this.#handleClick);
    this.addEventListener("keydown", this.#handleKeyDown);
    this.menu?.addEventListener("toggle", this.#handlePopoverToggle);
    document.addEventListener("pointerdown", this.#handleOutsidePointerDown);
    this.#setup();

    if (this.defaultOpen) {
      this.open = true;
    }
  }

  override disconnectedCallback(): void {
    this.removeEventListener("click", this.#handleClick);
    this.removeEventListener("keydown", this.#handleKeyDown);
    this.menu?.removeEventListener("toggle", this.#handlePopoverToggle);
    document.removeEventListener("pointerdown", this.#handleOutsidePointerDown);
    window.removeEventListener("resize", this.#position);
    window.removeEventListener("scroll", this.#position, true);
    super.disconnectedCallback();
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has("open")) {
      this.#syncOpen();
    }

    if (changed.has("value")) {
      this.#syncSelection();
    }

    if (changed.has("open") && changed.get("open") !== undefined) {
      this.dispatchEvent(
        new CustomEvent<boolean>("open-change", {
          bubbles: true,
          composed: true,
          detail: this.open,
        }),
      );
    }
  }

  #setup(): void {
    const trigger = this.trigger;
    const menu = this.menu;

    if (!trigger || !menu) {
      return;
    }

    if (!menu.id) {
      menu.id = `ore-dropdown-${++dropdownId}`;
    }

    trigger.setAttribute("aria-haspopup", "menu");
    trigger.setAttribute("aria-controls", menu.id);
    menu.setAttribute("role", "menu");
    menu.setAttribute("popover", "manual");

    for (const item of this.items) {
      item.setAttribute("role", "menuitemradio");
      item.tabIndex = -1;
    }

    this.#syncSelection();
    this.#syncExpanded();
  }

  #syncOpen(): void {
    const menu = this.menu;

    if (!menu) {
      return;
    }

    if (this.open && !menu.matches(":popover-open")) {
      menu.showPopover();
      window.addEventListener("resize", this.#position);
      window.addEventListener("scroll", this.#position, true);
      requestAnimationFrame(this.#position);
    } else if (!this.open && menu.matches(":popover-open")) {
      menu.hidePopover();
      window.removeEventListener("resize", this.#position);
      window.removeEventListener("scroll", this.#position, true);
    }

    this.#syncExpanded();
  }

  #syncExpanded(): void {
    this.trigger?.setAttribute("aria-expanded", String(this.open));
  }

  #syncSelection(): void {
    for (const item of this.items) {
      const selected = item.dataset.value === this.value;
      item.toggleAttribute("selected", selected);
      item.setAttribute("aria-checked", String(selected));
    }
  }

  readonly #position = (): void => {
    const trigger = this.trigger;
    const menu = this.menu;

    if (!trigger || !menu || !menu.matches(":popover-open")) {
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const unit = Number.parseFloat(getComputedStyle(menu).paddingTop);
    const inset = 2;
    const left = Math.min(
      Math.max(triggerRect.left, inset),
      innerWidth - menuRect.width - inset,
    );
    const below = triggerRect.bottom + menuRect.height <= innerHeight - inset;

    menu.style.left = `${left}px`;
    menu.style.top = `${below ? triggerRect.bottom - unit : triggerRect.top - menuRect.height + unit}px`;
    menu.style.width = `${triggerRect.width}px`;
  };

  #enabledItems(): HTMLElement[] {
    return this.items.filter((item) => !item.hasAttribute("disabled"));
  }

  #focusItem(index: number): void {
    const items = this.#enabledItems();

    if (items.length > 0) {
      items[(index + items.length) % items.length]?.focus();
    }
  }

  #openAndFocus(last = false): void {
    this.open = true;
    requestAnimationFrame(() => this.#focusItem(last ? -1 : 0));
  }

  #select(item: HTMLElement): void {
    const value = item.dataset.value;

    if (value === undefined || item.hasAttribute("disabled")) {
      return;
    }

    this.value = value;
    this.open = false;
    this.trigger?.focus();
    this.dispatchEvent(
      new CustomEvent<OreDropdownChangeDetail>("change", {
        bubbles: true,
        composed: true,
        detail: { item, value },
      }),
    );
  }

  readonly #handleClick = (event: MouseEvent): void => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const item = target.closest<HTMLElement>(".ore-dropdown-item");

    if (item && this.contains(item)) {
      this.#select(item);
    } else if (target.closest(".ore-dropdown-trigger") === this.trigger) {
      this.open = !this.open;
    }
  };

  readonly #handleKeyDown = (event: KeyboardEvent): void => {
    const target = event.target;

    if (target === this.trigger) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        this.#openAndFocus(event.key === "ArrowUp");
      } else if (event.key === "Escape" && this.open) {
        event.preventDefault();
        this.open = false;
      }
      return;
    }

    if (
      !(target instanceof HTMLElement) ||
      !target.matches(".ore-dropdown-item")
    ) {
      return;
    }

    const items = this.#enabledItems();
    const index = items.indexOf(target);

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      this.#focusItem(index + (event.key === "ArrowDown" ? 1 : -1));
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      this.#focusItem(event.key === "Home" ? 0 : -1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.#select(target);
    } else if (event.key === "Escape") {
      event.preventDefault();
      this.open = false;
      this.trigger?.focus();
    } else if (event.key === "Tab") {
      this.open = false;
    }
  };

  readonly #handleOutsidePointerDown = (event: PointerEvent): void => {
    if (
      this.open &&
      event.target instanceof Node &&
      !this.contains(event.target)
    ) {
      this.open = false;
    }
  };

  readonly #handlePopoverToggle = (event: ToggleEvent): void => {
    if (event.newState === "closed" && this.open) {
      this.open = false;
    }
  };
}

if (!customElements.get("ore-dropdown")) {
  customElements.define("ore-dropdown", OreDropdown);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-dropdown": OreDropdown;
  }
}
