"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Accordion } from "@oreui-web/react/accordion";
import { IconButton } from "@oreui-web/react/icon-button";
import { useEffect, useState } from "react";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Accordion defaultOpen={defaultOpen} value="realms">
      <IconButton
        aria-label={`Toggle ${title}`}
        className="ore-accordion-trigger"
        type="button"
      >
        <span className="ore-accordion-title">{title}</span>
      </IconButton>
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
