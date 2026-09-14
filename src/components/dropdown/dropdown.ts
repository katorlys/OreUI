export type OreDropdownElement = HTMLElement;
export type OreDropdownVariant = "bordered" | "borderless";

export interface OreDropdownChangeDetail {
  item: HTMLButtonElement;
  value: string;
}

interface DropdownState {
  handleClick: (event: MouseEvent) => void;
  handleDocumentPointerDown: (event: PointerEvent) => void;
  handleKeydown: (event: KeyboardEvent) => void;
  handleToggle: (event: ToggleEvent) => void;
  menu: HTMLElement;
  mutationObserver: MutationObserver;
  position: () => void;
  trigger: HTMLButtonElement;
}

const dropdownSelector = ".ore-dropdown";
const states = new WeakMap<OreDropdownElement, DropdownState>();
let openState: DropdownState | null = null;
let dropdownId = 0;

function getItems(dropdown: OreDropdownElement): HTMLButtonElement[] {
  return [
    ...dropdown.querySelectorAll<HTMLButtonElement>(
      ":scope > .ore-dropdown-menu > .ore-dropdown-item",
    ),
  ];
}

function syncSelection(dropdown: OreDropdownElement): void {
  const value = dropdown.dataset.value ?? "";
  let selectedItem: HTMLButtonElement | undefined;

  for (const item of getItems(dropdown)) {
    const selected = item.dataset.value === value;
    item.setAttribute("aria-checked", String(selected));
    item.setAttribute("role", "menuitemradio");
    item.tabIndex = -1;

    if (selected) {
      selectedItem = item;
    }
  }

  const label = selectedItem?.textContent?.trim();
  const labelElement = states
    .get(dropdown)
    ?.trigger.querySelector<HTMLElement>(
      ":scope > .ore-dropdown-trigger-label",
    );

  if (label && labelElement && labelElement.textContent !== label) {
    labelElement.textContent = label;
  }
}

function enabledItems(dropdown: OreDropdownElement): HTMLButtonElement[] {
  return getItems(dropdown).filter((item) => !item.disabled);
}

function focusItem(dropdown: OreDropdownElement, index: number): void {
  const items = enabledItems(dropdown);
  const item = items[(index + items.length) % items.length];

  item?.focus();
  item?.scrollIntoView({ block: "nearest" });
}

export function initDropdown(dropdown: OreDropdownElement): void {
  if (states.has(dropdown)) {
    syncSelection(dropdown);
    return;
  }

  const trigger = dropdown.querySelector<HTMLButtonElement>(
    ":scope > .ore-dropdown-trigger",
  );
  const menu = dropdown.querySelector<HTMLElement>(
    ":scope > .ore-dropdown-menu",
  );

  if (!trigger || !menu) {
    return;
  }

  if (!menu.id) {
    menu.id = `ore-dropdown-${++dropdownId}`;
  }

  trigger.setAttribute("aria-haspopup", "menu");
  trigger.setAttribute("aria-controls", menu.id);
  trigger.setAttribute("aria-expanded", "false");
  trigger.removeAttribute("popovertarget");
  menu.setAttribute("popover", "manual");
  menu.setAttribute("role", "menu");
  menu.classList.add("ore-scrollbar");

  const position = (): void => {
    if (!menu.matches(":popover-open")) {
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    menu.style.width = `${triggerRect.width}px`;
    const scrollbarWidth = menu.offsetWidth - menu.clientWidth;
    menu.style.setProperty(
      "--ore-dropdown-scrollbar-width",
      `${scrollbarWidth}px`,
    );
    const menuRect = menu.getBoundingClientRect();
    const inset = 2;
    const left = Math.min(
      Math.max(triggerRect.left, inset),
      innerWidth - menuRect.width - inset,
    );
    const below = triggerRect.bottom + menuRect.height <= innerHeight - inset;

    menu.style.left = `${left}px`;
    menu.style.top = `${below ? triggerRect.bottom : triggerRect.top - menuRect.height}px`;
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

  const handleToggle = (event: ToggleEvent): void => {
    const open = event.newState === "open";
    trigger.setAttribute("aria-expanded", String(open));

    if (open) {
      openState = states.get(dropdown) ?? null;
      startPositioning();
    } else {
      if (openState?.menu === menu) {
        openState = null;
      }
      stopPositioning();
    }
  };

  const close = (): void => {
    if (menu.matches(":popover-open")) {
      menu.hidePopover();
    }
  };

  const open = (): void => {
    if (menu.matches(":popover-open")) {
      return;
    }

    if (openState && openState.menu !== menu) {
      openState.menu.hidePopover();
    }

    menu.showPopover();
    openState = states.get(dropdown) ?? null;
    startPositioning();
  };

  const select = (item: HTMLButtonElement): void => {
    const value = item.dataset.value;

    if (value === undefined || item.disabled) {
      return;
    }

    dropdown.dataset.value = value;
    syncSelection(dropdown);
    close();
    trigger.focus();
    dropdown.dispatchEvent(
      new CustomEvent<OreDropdownChangeDetail>("change", {
        bubbles: true,
        detail: { item, value },
      }),
    );
  };

  const handleClick = (event: MouseEvent): void => {
    const target = event.target;
    const item =
      target instanceof Element
        ? target.closest<HTMLButtonElement>(".ore-dropdown-item")
        : null;

    if (item && dropdown.contains(item)) {
      select(item);
    } else if (
      target instanceof Element &&
      target.closest(".ore-dropdown-trigger") === trigger
    ) {
      if (menu.matches(":popover-open")) {
        close();
      } else {
        open();
      }
    }
  };

  const handleDocumentPointerDown = (event: PointerEvent): void => {
    if (
      menu.matches(":popover-open") &&
      !event.composedPath().includes(dropdown)
    ) {
      close();
    }
  };

  const handleKeydown = (event: KeyboardEvent): void => {
    if (event.target === trigger) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (!menu.matches(":popover-open")) {
          open();
        }
        requestAnimationFrame(() =>
          focusItem(dropdown, event.key === "ArrowUp" ? -1 : 0),
        );
      } else if (event.key === "Escape" && menu.matches(":popover-open")) {
        event.preventDefault();
        close();
      }
      return;
    }

    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }

    const items = enabledItems(dropdown);
    const index = items.indexOf(event.target);

    if (index < 0) {
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      focusItem(dropdown, index + (event.key === "ArrowDown" ? 1 : -1));
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      focusItem(dropdown, event.key === "Home" ? 0 : -1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select(event.target);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
      trigger.focus();
    } else if (event.key === "Tab") {
      close();
    }
  };

  const mutationObserver = new MutationObserver(() => syncSelection(dropdown));
  states.set(dropdown, {
    handleClick,
    handleDocumentPointerDown,
    handleKeydown,
    handleToggle,
    menu,
    mutationObserver,
    position,
    trigger,
  });
  dropdown.dataset.oreInitialized = "dropdown";
  dropdown.addEventListener("click", handleClick);
  dropdown.addEventListener("keydown", handleKeydown);
  document.addEventListener("pointerdown", handleDocumentPointerDown, true);
  menu.addEventListener("toggle", handleToggle);
  mutationObserver.observe(dropdown, {
    attributeFilter: ["data-value", "disabled"],
    attributes: true,
    childList: true,
    subtree: true,
  });
  syncSelection(dropdown);
}

export function destroyDropdown(dropdown: OreDropdownElement): void {
  const state = states.get(dropdown);

  if (!state) {
    return;
  }

  dropdown.removeEventListener("click", state.handleClick);
  dropdown.removeEventListener("keydown", state.handleKeydown);
  document.removeEventListener(
    "pointerdown",
    state.handleDocumentPointerDown,
    true,
  );
  state.menu.removeEventListener("toggle", state.handleToggle);
  state.mutationObserver.disconnect();
  window.removeEventListener("resize", state.position);
  window.removeEventListener("scroll", state.position, true);
  if (openState === state) {
    openState = null;
  }
  delete dropdown.dataset.oreInitialized;
  states.delete(dropdown);
}

export function initDropdowns(root: ParentNode = document): void {
  if (root instanceof HTMLElement && root.matches(dropdownSelector)) {
    initDropdown(root);
  }

  for (const dropdown of root.querySelectorAll<OreDropdownElement>(
    dropdownSelector,
  )) {
    initDropdown(dropdown);
  }
}

if (typeof document !== "undefined") {
  initDropdowns();

  new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node instanceof HTMLElement) {
          initDropdowns(node);
        }
      }

      for (const node of record.removedNodes) {
        if (node instanceof HTMLElement && node.matches(dropdownSelector)) {
          destroyDropdown(node);
        }

        if (node instanceof HTMLElement) {
          for (const dropdown of node.querySelectorAll<OreDropdownElement>(
            dropdownSelector,
          )) {
            destroyDropdown(dropdown);
          }
        }
      }
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
}
