import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "../../default-theme.js";

export type OreUITooltipPlacement = "top" | "right" | "bottom" | "left";

let tooltipId = 0;

@customElement("oreui-tooltip")
export class OreUITooltip extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .trigger {
      display: contents;
    }

    .tooltip {
      position: fixed;
      z-index: var(--oreui-tooltip-z-index, 1000);
      max-inline-size: min(
        var(--oreui-tooltip-max-width, 320px),
        calc(100vw - 16px)
      );
      box-sizing: border-box;
      padding: var(--oreui-border-width, 4px);
      color: var(--oreui-color-tooltip-text);
      font-family: var(--oreui-font-family, "Minecraft", monospace);
      font-size: var(--oreui-tooltip-font-size, 20px);
      line-height: 1.2;
      overflow-wrap: anywhere;
      pointer-events: none;
    }

    .tooltip[hidden] {
      display: none;
    }

    .shape {
      position: relative;
      display: block;
    }

    .body {
      display: block;
      box-sizing: border-box;
      padding: var(--oreui-tooltip-padding-block, 8px)
        var(--oreui-tooltip-padding-inline, 12px);
      background: var(--oreui-color-tooltip-surface);
      clip-path: polygon(
        var(--oreui-tooltip-pixel-size, 8px) 0,
        calc(100% - var(--oreui-tooltip-pixel-size, 8px)) 0,
        calc(100% - var(--oreui-tooltip-pixel-size, 8px))
          var(--oreui-tooltip-pixel-size, 8px),
        100% var(--oreui-tooltip-pixel-size, 8px),
        100% calc(100% - var(--oreui-tooltip-pixel-size, 8px)),
        calc(100% - var(--oreui-tooltip-pixel-size, 8px))
          calc(100% - var(--oreui-tooltip-pixel-size, 8px)),
        calc(100% - var(--oreui-tooltip-pixel-size, 8px)) 100%,
        var(--oreui-tooltip-pixel-size, 8px) 100%,
        var(--oreui-tooltip-pixel-size, 8px)
          calc(100% - var(--oreui-tooltip-pixel-size, 8px)),
        0 calc(100% - var(--oreui-tooltip-pixel-size, 8px)),
        0 var(--oreui-tooltip-pixel-size, 8px),
        var(--oreui-tooltip-pixel-size, 8px)
          var(--oreui-tooltip-pixel-size, 8px)
      );
    }

    .outline-filter {
      position: absolute;
      inline-size: 0;
      block-size: 0;
      overflow: hidden;
    }

    .arrow {
      position: absolute;
      inline-size: calc(3 * var(--oreui-tooltip-pixel-size, 8px));
      block-size: calc(3 * var(--oreui-tooltip-pixel-size, 8px));
      background: var(--oreui-color-tooltip-surface);
      clip-path: polygon(
        0 0,
        100% 0,
        100% 100%,
        calc(2 * var(--oreui-tooltip-pixel-size, 8px)) 100%,
        calc(2 * var(--oreui-tooltip-pixel-size, 8px))
          calc(2 * var(--oreui-tooltip-pixel-size, 8px)),
        var(--oreui-tooltip-pixel-size, 8px)
          calc(2 * var(--oreui-tooltip-pixel-size, 8px)),
        var(--oreui-tooltip-pixel-size, 8px)
          var(--oreui-tooltip-pixel-size, 8px),
        0 var(--oreui-tooltip-pixel-size, 8px)
      );
    }

    .tooltip[data-placement="top"] .arrow {
      inset-block-start: calc(100% - var(--oreui-border-width, 4px));
      inset-inline-end: var(--oreui-tooltip-arrow-offset, 20px);
    }

    .tooltip[data-placement="bottom"] .arrow {
      inset-block-end: calc(100% - 2 * var(--oreui-border-width, 4px));
      inset-inline-start: var(--oreui-tooltip-arrow-offset, 20px);
      transform: rotate(180deg);
    }

    .tooltip[data-placement="left"] .arrow {
      inset-block-end: var(--oreui-tooltip-pixel-size, 8px);
      inset-inline-start: calc(100% - 2 * var(--oreui-border-width, 4px));
      transform: rotate(-90deg);
    }

    .tooltip[data-placement="right"] .arrow {
      inset-block-start: var(--oreui-tooltip-pixel-size, 8px);
      inset-inline-end: calc(100% - 2 * var(--oreui-border-width, 4px));
      clip-path: polygon(
        0 0,
        100% 0,
        100% var(--oreui-tooltip-pixel-size, 8px),
        calc(2 * var(--oreui-tooltip-pixel-size, 8px))
          var(--oreui-tooltip-pixel-size, 8px),
        calc(2 * var(--oreui-tooltip-pixel-size, 8px))
          calc(2 * var(--oreui-tooltip-pixel-size, 8px)),
        var(--oreui-tooltip-pixel-size, 8px)
          calc(2 * var(--oreui-tooltip-pixel-size, 8px)),
        var(--oreui-tooltip-pixel-size, 8px) 100%,
        0 100%
      );
      transform: rotate(90deg);
    }
  `;

  @property()
  content = "";

  @property({ reflect: true })
  placement: OreUITooltipPlacement = "top";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Number, attribute: "show-delay" })
  showDelay = 300;

  @property({ type: Number, attribute: "hide-delay" })
  hideDelay = 100;

  @state()
  private open = false;

  private actualPlacement: OreUITooltipPlacement = "top";

  private readonly tooltipId = `oreui-tooltip-${++tooltipId}`;
  private showTimer?: number;
  private hideTimer?: number;
  private describedElement?: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("keydown", this.handleDocumentKeydown);
    window.addEventListener("resize", this.handleViewportChange);
    window.addEventListener("scroll", this.handleViewportChange, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearTimers();
    this.removeDescription();
    document.removeEventListener("keydown", this.handleDocumentKeydown);
    window.removeEventListener("resize", this.handleViewportChange);
    window.removeEventListener("scroll", this.handleViewportChange, true);
  }

  protected override render() {
    return html`
      <span
        class="trigger"
        @pointerenter=${this.scheduleShow}
        @pointerleave=${this.scheduleHide}
        @focusin=${this.scheduleShow}
        @focusout=${this.scheduleHide}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </span>
      <span
        id=${this.tooltipId}
        class="tooltip"
        role="tooltip"
        data-placement=${this.actualPlacement}
        ?hidden=${!this.open}
        part="tooltip"
      >
        <svg class="outline-filter" aria-hidden="true">
          <defs>
            <filter
              id=${`${this.tooltipId}-outline`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
              color-interpolation-filters="sRGB"
            >
              <feMorphology
                in="SourceAlpha"
                operator="dilate"
                radius="4"
                result="outline-alpha"
              ></feMorphology>
              <feFlood
                flood-color="var(--oreui-color-ink)"
                result="outline-color"
              ></feFlood>
              <feComposite
                in="outline-color"
                in2="outline-alpha"
                operator="in"
                result="outline"
              ></feComposite>
              <feMerge>
                <feMergeNode in="outline"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
              </feMerge>
            </filter>
          </defs>
        </svg>
        <span class="shape" style=${`filter: url(#${this.tooltipId}-outline)`}>
          <span class="body">
            ${this.content || html`<slot name="content"></slot>`}
          </span>
          <span class="arrow" part="arrow"></span>
        </span>
      </span>
    `;
  }

  protected override updated(changedProperties: Map<PropertyKey, unknown>) {
    if (changedProperties.has("disabled")) {
      if (this.disabled) {
        this.clearTimers();
        this.hideImmediate();
        this.removeDescription();
      } else {
        this.addDescription();
      }
    }

    if (this.open) {
      this.positionTooltip();
    }
  }

  private handleSlotChange(event: Event) {
    const slot = event.currentTarget as HTMLSlotElement;
    this.removeDescription();
    this.describedElement = slot
      .assignedElements({ flatten: true })
      .find(
        (element): element is HTMLElement => element instanceof HTMLElement,
      );
    this.addDescription();
  }

  private scheduleShow = () => {
    if (this.disabled || (!this.content && !this.hasSlottedContent())) {
      return;
    }
    window.clearTimeout(this.hideTimer);
    this.showTimer = window.setTimeout(
      () => {
        this.open = true;
        this.addDescription();
      },
      Math.max(0, this.showDelay),
    );
  };

  private scheduleHide = () => {
    window.clearTimeout(this.showTimer);
    this.hideTimer = window.setTimeout(
      () => this.hideImmediate(),
      Math.max(0, this.hideDelay),
    );
  };

  private hideImmediate() {
    this.open = false;
  }

  private positionTooltip() {
    const tooltip = this.renderRoot.querySelector<HTMLElement>(".tooltip");
    if (!tooltip) {
      return;
    }

    const trigger = this.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const gap = 20;
    const margin = 8;
    const opposite: Record<OreUITooltipPlacement, OreUITooltipPlacement> = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    };

    let placement = this.placement;
    if (!this.fits(placement, trigger, tooltipRect, gap, margin)) {
      const fallback = opposite[placement];
      if (this.fits(fallback, trigger, tooltipRect, gap, margin)) {
        placement = fallback;
      }
    }

    const position = this.calculatePosition(
      placement,
      trigger,
      tooltipRect,
      gap,
    );
    tooltip.style.left = `${Math.min(Math.max(position.left, margin), window.innerWidth - tooltipRect.width - margin)}px`;
    tooltip.style.top = `${Math.min(Math.max(position.top, margin), window.innerHeight - tooltipRect.height - margin)}px`;
    this.actualPlacement = placement;
    tooltip.dataset.placement = placement;
  }

  private calculatePosition(
    placement: OreUITooltipPlacement,
    trigger: DOMRect,
    tooltip: DOMRect,
    gap: number,
  ) {
    if (placement === "top") {
      return {
        left: trigger.left + (trigger.width - tooltip.width) / 2,
        top: trigger.top - tooltip.height - gap,
      };
    }
    if (placement === "bottom") {
      return {
        left: trigger.left + (trigger.width - tooltip.width) / 2,
        top: trigger.bottom + gap,
      };
    }
    if (placement === "left") {
      return {
        left: trigger.left - tooltip.width - gap,
        top: trigger.top + (trigger.height - tooltip.height) / 2,
      };
    }
    return {
      left: trigger.right + gap,
      top: trigger.top + (trigger.height - tooltip.height) / 2,
    };
  }

  private fits(
    placement: OreUITooltipPlacement,
    trigger: DOMRect,
    tooltip: DOMRect,
    gap: number,
    margin: number,
  ) {
    if (placement === "top") {
      return trigger.top - tooltip.height - gap >= margin;
    }
    if (placement === "bottom") {
      return (
        trigger.bottom + tooltip.height + gap <= window.innerHeight - margin
      );
    }
    if (placement === "left") {
      return trigger.left - tooltip.width - gap >= margin;
    }
    return trigger.right + tooltip.width + gap <= window.innerWidth - margin;
  }

  private hasSlottedContent() {
    const slot = this.renderRoot.querySelector<HTMLSlotElement>(
      'slot[name="content"]',
    );
    return Boolean(slot?.assignedNodes({ flatten: true }).length);
  }

  private addDescription() {
    if (!this.describedElement || this.disabled) {
      return;
    }
    const ids = new Set(
      (this.describedElement.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter(Boolean),
    );
    ids.add(this.tooltipId);
    this.describedElement.setAttribute("aria-describedby", [...ids].join(" "));
  }

  private removeDescription() {
    if (!this.describedElement) {
      return;
    }
    const ids = (this.describedElement.getAttribute("aria-describedby") || "")
      .split(/\s+/)
      .filter((id) => id && id !== this.tooltipId);
    if (ids.length) {
      this.describedElement.setAttribute("aria-describedby", ids.join(" "));
    } else {
      this.describedElement.removeAttribute("aria-describedby");
    }
  }

  private clearTimers() {
    window.clearTimeout(this.showTimer);
    window.clearTimeout(this.hideTimer);
  }

  private handleDocumentKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && this.open) {
      this.clearTimers();
      this.hideImmediate();
    }
  };

  private handleViewportChange = () => {
    if (this.open) {
      this.positionTooltip();
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "oreui-tooltip": OreUITooltip;
  }
}
