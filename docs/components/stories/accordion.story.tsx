"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Accordion } from "@oreui-web/react/accordion";

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
    <Accordion open={defaultOpen}>
      <summary>
        <span className="ore-accordion-title">{title}</span>
      </summary>
      <div className="ore-accordion-content">{content}</div>
    </Accordion>
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
