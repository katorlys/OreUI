"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Tag } from "@katorlys/oreui-react/tag";

interface TagPreviewProps {
  label: string;
  outlined: boolean;
  variant:
    | "neutral"
    | "secondary"
    | "primary"
    | "informative"
    | "notice"
    | "warning"
    | "realms-informative";
}

function TagPreview({ label, outlined, variant }: TagPreviewProps) {
  return (
    <Tag outlined={outlined} variant={variant}>
      {label}
    </Tag>
  );
}

const { defineStory } = defineStoryFactory();

export const tagStory = defineStory({
  Component: TagPreview,
  displayName: "Tag",
  args: {
    initial: {
      label: "New",
      outlined: false,
      variant: "primary",
    },
  },
});

export const TagStory = tagStory.WithControl;
