export type OreTooltipElement = HTMLElement;
export type OreTooltipSide = "top" | "right" | "bottom" | "left";

interface TooltipState {
  content: HTMLElement;
  handleFocusIn: () => void;
  handleFocusOut: (event: FocusEvent) => void;
  handleKeydown: (event: KeyboardEvent) => void;
  handlePointerEnter: () => void;
  handlePointerLeave: () => void;
  handleToggle: (event: ToggleEvent) => void;
  mutationObserver: MutationObserver;
  position: () => void;
  timer: number | undefined;
  trigger: HTMLElement;
}

const tooltipSelector = ".ore-tooltip";
const states = new WeakMap<OreTooltipElement, TooltipState>();
let tooltipId = 0;

function getSide(tooltip: OreTooltipElement): OreTooltipSide {
  const side = tooltip.dataset.side;
  return side === "right" || side === "bottom" || side === "left"
    ? side
    : "top";
}

function getDelay(tooltip: OreTooltipElement): number {
  const delay = Number(tooltip.dataset.delay);
  return Number.isFinite(delay) && delay >= 0 ? delay : 500;
}

export function initTooltip(tooltip: OreTooltipElement): void {
  if (states.has(tooltip)) {
    return;
  }

  const trigger = tooltip.querySelector<HTMLElement>(
    ":scope > .ore-tooltip-trigger",
  );
  const content = tooltip.querySelector<HTMLElement>(
    ":scope > .ore-tooltip-content",
  );

  if (!trigger || !content) {
    return;
  }

  if (!content.id) {
    content.id = `ore-tooltip-${++tooltipId}`;
  }

  trigger.setAttribute("aria-describedby", content.id);
  content.setAttribute("role", "tooltip");
  content.setAttribute("popover", "manual");

  const position = (): void => {
    if (!content.matches(":popover-open")) {
      return;
    }

    const side = getSide(tooltip);
    const triggerRect = trigger.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const arrow = content.querySelector<HTMLElement>(".ore-tooltip-arrow");
    const arrowRect = arrow?.getBoundingClientRect();
    const arrowSize =
      side === "top" || side === "bottom"
        ? (arrowRect?.height ?? 0)
        : (arrowRect?.width ?? 0);
    const arrowOffset = arrowSize * 0.75;
    const triggerCenterX = triggerRect.left + triggerRect.width / 2;
    const triggerCenterY = triggerRect.top + triggerRect.height / 2;
    let left = triggerCenterX - contentRect.width / 2;
    let top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;

    if (side === "top") {
      top = triggerRect.top - contentRect.height - arrowSize;
    } else if (side === "right") {
      left = triggerRect.right + arrowOffset + (arrowSize * 3) / 4;
    } else if (side === "bottom") {
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

  const startPositioning = (): void => {
    position();
    requestAnimationFrame(position);
    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);
  };

  const stopPositioning = (): void => {
    window.removeEventListener("resize", position);
    window.removeEventListener("scroll", position, true);
  };

  const close = (controlled = false): void => {
    window.clearTimeout(state.timer);
    if (!controlled && tooltip.hasAttribute("data-open")) {
      return;
    }
    if (content.matches(":popover-open")) {
      content.hidePopover();
    }
  };

  const open = (controlled = false): void => {
    if (!controlled && tooltip.hasAttribute("data-open")) {
      return;
    }
    if (content.matches(":popover-open")) {
      return;
    }

    content.showPopover();
    startPositioning();
  };

  const scheduleOpen = (): void => {
    window.clearTimeout(state.timer);
    state.timer = window.setTimeout(open, getDelay(tooltip));
  };

  const handlePointerLeave = (): void => {
    if (!tooltip.contains(document.activeElement)) {
      close();
    }
  };
  const handleFocusOut = (event: FocusEvent): void => {
    if (
      !(event.relatedTarget instanceof Node) ||
      (!tooltip.contains(event.relatedTarget) && !tooltip.matches(":hover"))
    ) {
      close();
    }
  };
  const handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  };
  const handleToggle = (event: ToggleEvent): void => {
    if (event.newState === "open") {
      startPositioning();
    } else {
      stopPositioning();
    }
    tooltip.dispatchEvent(
      new CustomEvent<boolean>("oreui:openchange", {
        bubbles: true,
        detail: event.newState === "open",
      }),
    );
  };

  const state: TooltipState = {
    content,
    handleFocusIn: scheduleOpen,
    handleFocusOut,
    handleKeydown,
    handlePointerEnter: scheduleOpen,
    handlePointerLeave,
    handleToggle,
    mutationObserver: new MutationObserver((records) => {
      const openChanged = records.some(
        (record) =>
          record.target === tooltip && record.attributeName === "data-open",
      );

      if (openChanged) {
        const shouldOpen = tooltip.dataset.open === "true";

        if (shouldOpen !== content.matches(":popover-open")) {
          if (shouldOpen) {
            open(true);
          } else {
            close(true);
          }
          return;
        }
      }

      if (content.matches(":popover-open")) {
        position();
      }
    }),
    position,
    timer: undefined,
    trigger,
  };

  states.set(tooltip, state);
  tooltip.dataset.oreInitialized = "tooltip";
  tooltip.addEventListener("pointerenter", state.handlePointerEnter);
  tooltip.addEventListener("pointerleave", state.handlePointerLeave);
  tooltip.addEventListener("focusin", state.handleFocusIn);
  tooltip.addEventListener("focusout", state.handleFocusOut);
  tooltip.addEventListener("keydown", state.handleKeydown);
  content.addEventListener("toggle", state.handleToggle);
  state.mutationObserver.observe(tooltip, {
    attributes: true,
    attributeFilter: ["data-side", "data-delay", "data-open"],
    childList: true,
    subtree: true,
  });

  if (
    tooltip.dataset.open === "true" ||
    tooltip.hasAttribute("data-default-open")
  ) {
    open(tooltip.hasAttribute("data-open"));
  }
}

export function destroyTooltip(tooltip: OreTooltipElement): void {
  const state = states.get(tooltip);
  if (!state) {
    return;
  }

  window.clearTimeout(state.timer);
  tooltip.removeEventListener("pointerenter", state.handlePointerEnter);
  tooltip.removeEventListener("pointerleave", state.handlePointerLeave);
  tooltip.removeEventListener("focusin", state.handleFocusIn);
  tooltip.removeEventListener("focusout", state.handleFocusOut);
  tooltip.removeEventListener("keydown", state.handleKeydown);
  state.content.removeEventListener("toggle", state.handleToggle);
  state.mutationObserver.disconnect();
  window.removeEventListener("resize", state.position);
  window.removeEventListener("scroll", state.position, true);
  if (state.content.matches(":popover-open")) {
    state.content.hidePopover();
  }
  delete tooltip.dataset.oreInitialized;
  states.delete(tooltip);
}

export function initTooltips(root: ParentNode = document): void {
  if (root instanceof HTMLElement && root.matches(tooltipSelector)) {
    initTooltip(root);
  }

  for (const tooltip of root.querySelectorAll<OreTooltipElement>(
    tooltipSelector,
  )) {
    initTooltip(tooltip);
  }
}

if (typeof document !== "undefined") {
  initTooltips();
  new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node instanceof HTMLElement) {
          initTooltips(node);
        }
      }
      for (const node of record.removedNodes) {
        if (node instanceof HTMLElement && node.matches(tooltipSelector)) {
          destroyTooltip(node);
        }
        if (node instanceof HTMLElement) {
          for (const tooltip of node.querySelectorAll<OreTooltipElement>(
            tooltipSelector,
          )) {
            destroyTooltip(tooltip);
          }
        }
      }
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
}
