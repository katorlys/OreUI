export type OreToggles = HTMLDivElement;

const states = new Set<OreToggles>();
const previousRoles = new WeakMap<OreToggles, string | null>();
const previousPalettes = new WeakMap<OreToggles, Map<HTMLButtonElement, string | null>>();
let observer: MutationObserver | undefined;

function syncTabs(toggles: OreToggles): void {
  const palettes = previousPalettes.get(toggles);
  for (const tab of toggles.querySelectorAll<HTMLButtonElement>(
    ":scope > .ore-tab-button",
  )) {
    if (palettes && !palettes.has(tab)) {
      palettes.set(tab, tab.getAttribute("data-palette"));
    }
    tab.dataset.palette = "toggle";
  }
}

export function initToggles(toggles: OreToggles): void {
  if (states.has(toggles)) {
    syncTabs(toggles);
    return;
  }

  states.add(toggles);
  previousRoles.set(toggles, toggles.getAttribute("role"));
  previousPalettes.set(
    toggles,
    new Map(
      [...toggles.querySelectorAll<HTMLButtonElement>(":scope > .ore-tab-button")].map(
        (tab) => [tab, tab.getAttribute("data-palette")],
      ),
    ),
  );
  toggles.dataset.oreInitialized = "toggles";
  toggles.setAttribute("role", "tablist");
  syncTabs(toggles);
}

export function destroyToggles(toggles: OreToggles): void {
  if (!states.delete(toggles)) {
    return;
  }

  const previousRole = previousRoles.get(toggles);
  if (previousRole === null) {
    toggles.removeAttribute("role");
  } else if (previousRole !== undefined) {
    toggles.setAttribute("role", previousRole);
  }
  const palettes = previousPalettes.get(toggles);
  if (palettes) {
    for (const [tab, previousPalette] of palettes) {
      if (previousPalette === null) {
        tab.removeAttribute("data-palette");
      } else if (tab.getAttribute("data-palette") === "toggle") {
        tab.setAttribute("data-palette", previousPalette);
      }
    }
  }
  previousRoles.delete(toggles);
  previousPalettes.delete(toggles);
  delete toggles.dataset.oreInitialized;
}

function destroyTogglesList(root: Node): void {
  if (root instanceof HTMLDivElement && root.matches(".ore-toggles")) {
    destroyToggles(root);
  }
  if (root instanceof HTMLElement) {
    for (const toggles of root.querySelectorAll<OreToggles>(".ore-toggles")) {
      destroyToggles(toggles);
    }
  }
}

export function initTogglesList(root: ParentNode = document): void {
  if (root instanceof HTMLDivElement && root.matches(".ore-toggles")) {
    initToggles(root);
  }
  for (const toggles of root.querySelectorAll<OreToggles>(".ore-toggles")) {
    initToggles(toggles);
  }
}

function startObserver(): void {
  if (typeof document === "undefined" || observer) {
    return;
  }

  observer = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.removedNodes) {
        destroyTogglesList(node);
      }
      for (const node of record.addedNodes) {
        if (node instanceof HTMLElement) {
          initTogglesList(node);
          const toggles = node.parentElement?.closest<OreToggles>(".ore-toggles");
          if (toggles && states.has(toggles)) {
            syncTabs(toggles);
          }
        }
      }
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

if (typeof document !== "undefined") {
  startObserver();
  initTogglesList();
}
