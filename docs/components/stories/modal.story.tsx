"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Button } from "@oreui-web/react/button";
import { Checkbox } from "@oreui-web/react/checkbox";
import { Container } from "@oreui-web/react/container";
import { Modal } from "@oreui-web/react/modal";
import { Textfield } from "@oreui-web/react/textfield";
import { createElement, useId, useRef } from "react";

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

function ModalPreview({ description, title, triggerLabel }: ModalPreviewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const id = useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;

  return (
    <>
      <Button onClick={() => dialogRef.current?.showModal()} type="button">
        {triggerLabel}
      </Button>
      <Modal
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        ref={dialogRef}
      >
        <form className="ore-modal-content" method="dialog">
          <header className="ore-modal-header">
            <button
              aria-label="Back"
              className="ore-modal-header-button"
              type="submit"
              value="back"
            >
              {createElement("ore-icon", { "aria-hidden": "true" }, backIcon)}
            </button>
            <h2
              className="ore-modal-title"
              id={titleId}
              style={{ fontFamily: "var(--ore-font-body)" }}
            >
              {title}
            </h2>
            <button
              aria-label="Close"
              className="ore-modal-header-button"
              type="submit"
              value="close"
            >
              {createElement("ore-icon", { "aria-hidden": "true" }, closeIcon)}
            </button>
          </header>
          <Container
            className="modal-form-body ore-scrollbar"
            variant="dark"
          >
            <p className="ore-modal-description" id={descriptionId}>
              {description}
            </p>
            <Textfield
              description="Description"
              label="Label"
              placeholder="Placeholder"
              style={{ width: "min(100%, 15.25rem)" }}
            />
          </Container>
          <Container
            className="modal-confirmation"
            variant="light"
          >
            <Checkbox>
              Checkbox example for confirmation
            </Checkbox>
          </Container>
          <Container
            className="modal-actions"
            variant="light"
          >
            <Button type="submit" value="confirm">
              Confirm
            </Button>
            <Button type="submit" value="cancel" color="secondary">
              Cancel
            </Button>
          </Container>
        </form>
      </Modal>
    </>
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
