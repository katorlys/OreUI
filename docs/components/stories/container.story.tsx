"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreContainer } from "@katorlys/oreui-react/container";

interface ContainerPreviewProps {
  description: string;
  title: string;
  variant: "dark" | "light";
}

function ContainerPreview({
  description,
  title,
  variant,
}: ContainerPreviewProps) {
  return (
    <OreContainer variant={variant} style={{ width: "min(100%, 32rem)" }}>
      <strong>{title}</strong>
      <span>{description}</span>
    </OreContainer>
  );
}

const { defineStory } = defineStoryFactory();

export const containerStory = defineStory({
  Component: ContainerPreview,
  displayName: "Container",
  args: {
    initial: {
      description: "Choose how players join your world.",
      title: "World settings",
      variant: "dark",
    },
  },
});

export const ContainerStory = containerStory.WithControl;
