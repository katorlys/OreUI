import { type PropertyValues, ReactiveElement } from "lit";

export type OreTooltipSide = "top" | "right" | "bottom" | "left";

let tooltipId = 0;

export class OreTooltip extends ReactiveElement {
  static properties = {
    defaultOpen: { type: Boolean, attribute: "default-open" },
    delay: { type: Number, reflect: true },
    open: { type: Boolean, reflect: true },
    side: { type: String, reflect: true },
  };

  declare defaultOpen: boolean;
  declare delay: number;
  declare open: boolean;
  declare side: OreTooltipSide;

  #timer: number | undefined;

  constructor() {
    super();
    this.defaultOpen = false;
    this.delay = 500;
    this.open = false;
    this.side = "top";
  }

  get trigger(): HTMLElement | null {
    return this.querySelector(":scope > .ore-tooltip-trigger");
  }

  get content(): HTMLElement | null {
    return this.querySelector(":scope > .ore-tooltip-content");
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("pointerenter", this.#scheduleOpen);
    this.addEventListener("pointerleave", this.#close);
    this.addEventListener("focusin", this.#scheduleOpen);
    this.addEventListener("focusout", this.#handleFocusOut);
    this.#setup();

    if (this.defaultOpen) {
      this.open = true;
    }
  }

  override disconnectedCallback(): void {
    this.removeEventListener("pointerenter", this.#scheduleOpen);
    this.removeEventListener("pointerleave", this.#close);
    this.removeEventListener("focusin", this.#scheduleOpen);
    this.removeEventListener("focusout", this.#handleFocusOut);
    this.#stopPositioning();
    window.clearTimeout(this.#timer);
    super.disconnectedCallback();
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has("open") || changed.has("side")) {
      this.#syncOpen();
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
    const content = this.content;

    if (!trigger || !content) {
      return;
    }

    if (!content.id) {
      content.id = `ore-tooltip-${++tooltipId}`;
    }

    trigger.setAttribute("aria-describedby", content.id);
    content.setAttribute("role", "tooltip");
    content.setAttribute("popover", "manual");
  }

  #syncOpen(): void {
    const content = this.content;

    if (!content) {
      return;
    }

    if (this.open && !content.matches(":popover-open")) {
      content.showPopover();
      this.#startPositioning();
    } else if (!this.open && content.matches(":popover-open")) {
      content.hidePopover();
      this.#stopPositioning();
    } else if (this.open) {
      this.#position();
    }
  }

  #startPositioning(): void {
    window.addEventListener("resize", this.#position);
    window.addEventListener("scroll", this.#position, true);
    document.addEventListener("keydown", this.#handleKeyDown);
    requestAnimationFrame(this.#position);
  }

  #stopPositioning(): void {
    window.removeEventListener("resize", this.#position);
    window.removeEventListener("scroll", this.#position, true);
    document.removeEventListener("keydown", this.#handleKeyDown);
  }

  readonly #position = (): void => {
    const trigger = this.trigger;
    const content = this.content;

    if (!trigger || !content || !content.matches(":popover-open")) {
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const arrow = content.querySelector<HTMLElement>(".ore-tooltip-arrow");
    const arrowRect = arrow?.getBoundingClientRect();
    const arrowSize =
      this.side === "top" || this.side === "bottom"
        ? (arrowRect?.height ?? 0)
        : (arrowRect?.width ?? 0);
    const arrowOffset = arrowSize * 0.75;
    const triggerCenterX = triggerRect.left + triggerRect.width / 2;
    const triggerCenterY = triggerRect.top + triggerRect.height / 2;
    let left = triggerCenterX - contentRect.width / 2;
    let top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;

    if (this.side === "top") {
      top = triggerRect.top - contentRect.height - arrowSize;
    } else if (this.side === "right") {
      left = triggerRect.right + arrowOffset + (arrowSize * 3) / 4;
    } else if (this.side === "bottom") {
      top = triggerRect.bottom + arrowSize;
    } else {
      left =
        triggerRect.left -
        contentRect.width -
        arrowOffset -
        (arrowSize * 3) / 4;
    }

    const inset = arrowSize;
    left = Math.min(
      Math.max(left, inset),
      innerWidth - contentRect.width - inset,
    );
    top = Math.min(
      Math.max(top, inset),
      innerHeight - contentRect.height - inset,
    );
    content.style.setProperty(
      "--ore-tooltip-arrow-y",
      `${Math.min(Math.max(triggerCenterY - top, arrowSize), contentRect.height - arrowSize)}px`,
    );
    content.style.left = `${left}px`;
    content.style.top = `${top}px`;
  };

  readonly #scheduleOpen = (): void => {
    window.clearTimeout(this.#timer);
    this.#timer = window.setTimeout(() => {
      this.open = true;
    }, this.delay);
  };

  readonly #close = (): void => {
    window.clearTimeout(this.#timer);
    this.open = false;
  };

  readonly #handleFocusOut = (event: FocusEvent): void => {
    if (
      !(event.relatedTarget instanceof Node) ||
      !this.contains(event.relatedTarget)
    ) {
      this.#close();
    }
  };

  readonly #handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      this.#close();
    }
  };
}

if (!customElements.get("ore-tooltip")) {
  customElements.define("ore-tooltip", OreTooltip);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-tooltip": OreTooltip;
  }
}
