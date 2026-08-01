"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreAccordion } from "@katorlys/oreui-react/accordion";
import { OreIconButton } from "@katorlys/oreui-react/icon-button";

interface AccordionPreviewProps {
  content: string;
  defaultOpen: boolean;
  title: string;
}

function AccordionPreview({
  content,
  defaultOpen,
  title,
}: AccordionPreviewProps) {
  return (
    <OreAccordion defaultOpen={defaultOpen} value="realms">
      <OreIconButton
        aria-label={`Toggle ${title}`}
        className="ore-accordion-trigger"
        type="button"
      >
        <span className="ore-accordion-title">{title}</span>
      </OreIconButton>
      <div className="ore-accordion-content">{content}</div>
    </OreAccordion>
  );
}

const { defineStory } = defineStoryFactory();

export const accordionStory = defineStory({
  Component: AccordionPreview,
  displayName: "Accordion",
  args: {
    initial: {
      content:
        "Realms are private, cloud-hosted worlds where you can play with friends.",
      defaultOpen: false,
      title: "What is Realms?",
    },
  },
});

export const AccordionStory = accordionStory.WithControl;