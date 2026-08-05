"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreContainer } from "@katorlys/oreui-react/container";
import { OreScrollbar } from "@katorlys/oreui-react/scrollbar";

interface ScrollbarPreviewProps {
  height: number;
  itemCount: number;
}

function ScrollbarPreview({ height, itemCount }: ScrollbarPreviewProps) {
  return (
    <OreScrollbar
      aria-label="World list"
      style={{ height: `${height}px`, width: "min(100%, 28rem)" }}
    >
      {Array.from({ length: itemCount }, (_, index) => (
        <OreContainer key={index} variant={index % 2 === 0 ? "dark" : "light"}>
          World {index + 1}
        </OreContainer>
      ))}
    </OreScrollbar>
  );
}

const { defineStory } = defineStoryFactory();

export const scrollbarStory = defineStory({
  Component: ScrollbarPreview,
  displayName: "Scrollbar",
  args: {
    initial: {
      height: 180,
      itemCount: 8,
    },
  },
});

export const ScrollbarStory = scrollbarStory.WithControl;
