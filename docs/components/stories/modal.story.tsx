"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreButton } from "@katorlys/oreui-react/button";
import { OreCheckbox } from "@katorlys/oreui-react/checkbox";
import { OreContainer } from "@katorlys/oreui-react/container";
import { OreModal } from "@katorlys/oreui-react/modal";
import { OreTextfield } from "@katorlys/oreui-react/textfield";
import {
  createElement,
  type CSSProperties,
  useEffect,
  useId,
  useState,
} from "react";

const backIcon = (
  <svg viewBox="0 0 8 8">
    <path
      d="M5 2h1V1H5zM2 5h1V4H2zm3-3H4v1h1-1v.003H3v1h1-1V6h1v-.997 1h.034V7H5v1h1V2z"
      fill="currentColor"
      fillRule="evenodd"
      transform="translate(0 -.5)"
    />
  </svg>
);

const closeIcon = (
  <svg viewBox="0 0 8 8">
    <path
      d="M.5.5h1v1h.966v1h-1v-1H.5zm7 1h-1v-1h1zm-2 1v-1h1v1zm-1 1h1v-1h-1zm0 1v-1h-1v-1h-1v1h1v1h-1v1h-1v1h-1v1h1v-1h1v-1h1v-1zm0 0h1v1h-1zm1.034 2H6.5v1h1v-1h-.966v-1h-1z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

interface ModalPreviewProps {
  description: string;
  title: string;
  triggerLabel: string;
}

function ModalPreview({
  description,
  title,
  triggerLabel,
}: ModalPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const id = useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <OreModal>
      <OreButton className="ore-modal-trigger" type="button">
        {triggerLabel}
      </OreButton>
      <dialog
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        className="ore-modal-dialog"
      >
        <form className="ore-modal-content">
          <header className="ore-modal-header">
            <button
              aria-label="Back"
              className="ore-modal-close ore-modal-header-button"
              type="button"
            >
              {createElement("ore-icon", { "aria-hidden": "true" }, backIcon)}
            </button>
            <h2 className="ore-modal-title" id={titleId}>
              {title}
            </h2>
            <button
              aria-label="Close"
              className="ore-modal-close ore-modal-header-button"
              type="button"
            >
              {createElement("ore-icon", { "aria-hidden": "true" }, closeIcon)}
            </button>
          </header>
          <OreContainer
            className="modal-form-body"
            style={{
              "--ore-container-gap": "1rem",
              "--ore-container-padding": "1rem 1.375rem",
            } as CSSProperties}
            variant="dark"
          >
            <p className="ore-modal-description" id={descriptionId}>
              {description}
            </p>
            <OreTextfield
              description="Description"
              label="Label"
              placeholder="Placeholder"
              style={{ width: "min(100%, 15.25rem)" }}
            />
          </OreContainer>
          <OreContainer
            className="modal-confirmation"
            style={{
              "--ore-container-gap": "0",
              "--ore-container-padding": "0.5rem 1.375rem",
              color: "var(--ore-color-foreground)",
            } as CSSProperties}
            variant="light"
          >
            <OreCheckbox style={{ color: "var(--ore-color-foreground)" }}>
              Checkbox example for confirmation
            </OreCheckbox>
          </OreContainer>
          <OreContainer
            className="modal-actions"
            style={{
              "--ore-container-gap": "0.25rem",
              "--ore-container-padding": "0.875rem 1.375rem",
            } as CSSProperties}
            variant="light"
          >
            <OreButton className="ore-modal-close" style={{ width: "100%" }} type="button">
              Confirm
            </OreButton>
            <OreButton
              className="ore-modal-close"
              style={{ width: "100%" }}
              type="button"
              variant="secondary"
            >
              Cancel
            </OreButton>
          </OreContainer>
        </form>
      </dialog>
    </OreModal>
  );
}

const { defineStory } = defineStoryFactory();

export const modalStory = defineStory({
  Component: ModalPreview,
  displayName: "Modal",
  args: {
    initial: {
      description:
        "Looong description. Lemon drops lollipop jelly beans powder brownie chocolate cake pastry chocolate cake powder. Bonbon candy canes dessert muffin gummies.",
      title: "Header",
      triggerLabel: "Open modal",
    },
  },
});

export const ModalStory = modalStory.WithControl;