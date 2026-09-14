import type { OreTagVariant } from "../tag/tag.js";

export type OreToastPosition =
  | "top-start"
  | "top-center"
  | "top-end"
  | "bottom-start"
  | "bottom-center"
  | "bottom-end";
export type OreToastVariant = OreTagVariant;
export type OreToastElement = HTMLElement;

type ToastState = {
  duration: number;
  remaining: number;
  startedAt: number;
  timer?: number;
};

const selector = ".ore-toast";
const states = new WeakMap<OreToastElement, ToastState>();

function durationFor(toast: OreToastElement): number {
  const duration = Number(toast.dataset.duration ?? 3000);
  return Number.isFinite(duration) && duration >= 0 ? duration : 3000;
}

function clearTimer(state: ToastState): void {
  window.clearTimeout(state.timer);
  state.timer = undefined;
}

function startTimer(toast: OreToastElement): void {
  const state = states.get(toast);
  if (!state || state.remaining <= 0 || !toast.matches(":popover-open")) {
    return;
  }

  clearTimer(state);
  state.startedAt = performance.now();
  state.timer = window.setTimeout(() => closeToast(toast), state.remaining);
}

function pauseTimer(toast: OreToastElement): void {
  const state = states.get(toast);
  if (state?.timer === undefined) {
    return;
  }

  state.remaining = Math.max(
    0,
    state.remaining - (performance.now() - state.startedAt),
  );
  clearTimer(state);
}

function resetTimer(toast: OreToastElement): void {
  const state = states.get(toast);
  if (!state) {
    return;
  }

  state.duration = durationFor(toast);
  state.remaining = state.duration;
  startTimer(toast);
}

function dispatchOpenChange(toast: OreToastElement, open: boolean): void {
  toast.dispatchEvent(
    new CustomEvent<boolean>("oreui:openchange", {
      bubbles: true,
      detail: open,
    }),
  );
}

function handleToggle(event: ToggleEvent): void {
  const toast = event.currentTarget as OreToastElement;
  const open = event.newState === "open";

  if (open) {
    resetTimer(toast);
  } else {
    const state = states.get(toast);
    if (state) {
      clearTimer(state);
    }
  }

  dispatchOpenChange(toast, open);
}

function handlePointerEnter(event: PointerEvent): void {
  pauseTimer(event.currentTarget as OreToastElement);
}

function handlePointerLeave(event: PointerEvent): void {
  startTimer(event.currentTarget as OreToastElement);
}

function handleFocusIn(event: FocusEvent): void {
  pauseTimer(event.currentTarget as OreToastElement);
}

function handleFocusOut(event: FocusEvent): void {
  const toast = event.currentTarget as OreToastElement;
  if (!toast.contains(event.relatedTarget as Node | null)) {
    startTimer(toast);
  }
}

export function showToast(toast: OreToastElement): void {
  initToast(toast);
  if (!toast.matches(":popover-open")) {
    toast.showPopover();
  } else {
    resetTimer(toast);
  }
}

export function closeToast(toast: OreToastElement): void {
  if (toast.matches(":popover-open")) {
    toast.hidePopover();
  }
}

export function destroyToast(toast: OreToastElement): void {
  const state = states.get(toast);
  if (!state) {
    return;
  }

  clearTimer(state);
  toast.removeEventListener("toggle", handleToggle);
  toast.removeEventListener("pointerenter", handlePointerEnter);
  toast.removeEventListener("pointerleave", handlePointerLeave);
  toast.removeEventListener("focusin", handleFocusIn);
  toast.removeEventListener("focusout", handleFocusOut);
  toast.removeAttribute("data-ore-initialized");
  states.delete(toast);
}

export function initToast(toast: OreToastElement): void {
  if (states.has(toast)) {
    return;
  }

  const duration = durationFor(toast);
  states.set(toast, { duration, remaining: duration, startedAt: 0 });
  toast.dataset.oreInitialized = "toast";
  toast.setAttribute("popover", "manual");
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.setAttribute("aria-atomic", "true");
  toast.addEventListener("toggle", handleToggle);
  toast.addEventListener("pointerenter", handlePointerEnter);
  toast.addEventListener("pointerleave", handlePointerLeave);
  toast.addEventListener("focusin", handleFocusIn);
  toast.addEventListener("focusout", handleFocusOut);

  if (
    toast.hasAttribute("data-open") ||
    toast.hasAttribute("data-default-open")
  ) {
    showToast(toast);
  }
}

export function initToasts(root: ParentNode = document): void {
  if (root instanceof HTMLElement && root.matches(selector)) {
    initToast(root);
  }
  for (const toast of root.querySelectorAll<OreToastElement>(selector)) {
    initToast(toast);
  }
}

if (typeof document !== "undefined") {
  initToasts();
  new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.removedNodes) {
        if (node instanceof HTMLElement) {
          if (node.matches(selector)) {
            destroyToast(node);
          }
          for (const toast of node.querySelectorAll<OreToastElement>(
            selector,
          )) {
            destroyToast(toast);
          }
        }
      }
      for (const node of record.addedNodes) {
        if (node instanceof HTMLElement) {
          initToasts(node);
        }
      }
      if (
        record.type === "attributes" &&
        record.target instanceof HTMLElement &&
        record.target.matches(selector)
      ) {
        const toast = record.target;
        if (record.attributeName === "data-duration") {
          resetTimer(toast);
        } else if (record.attributeName === "data-open") {
          if (toast.hasAttribute("data-open")) {
            showToast(toast);
          } else {
            closeToast(toast);
          }
        }
      }
    }
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-duration", "data-open"],
    childList: true,
    subtree: true,
  });
}
