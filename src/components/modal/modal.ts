export type OreModalElement = HTMLDialogElement;

const modalSelector = "dialog.ore-modal";

function initModal(modal: HTMLDialogElement): void {
  if (modal.dataset.oreInitialized === "modal") {
    return;
  }

  modal.dataset.oreInitialized = "modal";
  modal.addEventListener("cancel", () => {
    modal.returnValue = "escape";
  });
  modal.addEventListener("click", (event) => {
    const closeButton =
      event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-modal-close]")
        : null;

    if (closeButton && modal.contains(closeButton)) {
      modal.close(closeButton.dataset.modalClose);
      return;
    }

    if (event.target === modal) {
      modal.close("backdrop");
    }
  });
}

export function initModals(root: ParentNode = document): void {
  if (root instanceof HTMLDialogElement && root.matches(modalSelector)) {
    initModal(root);
  }

  for (const modal of root.querySelectorAll<HTMLDialogElement>(modalSelector)) {
    initModal(modal);
  }
}

if (typeof document !== "undefined") {
  initModals();

  new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node instanceof HTMLElement) {
          initModals(node);
        }
      }
    }
  }).observe(document.documentElement, { childList: true, subtree: true });

  document.addEventListener("click", (event) => {
    const trigger =
      event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-modal-target]")
        : null;
    const target = trigger?.dataset.modalTarget;

    if (!target) {
      return;
    }

    const modal = document.getElementById(target);
    if (modal instanceof HTMLDialogElement && modal.matches(modalSelector)) {
      modal.showModal();
    }
  });
}
