"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Divider } from "@oreui-web/react/divider";

function DividerPreview() {
  return <Divider style={{ width: "min(100%, 32rem)" }} />;
}

const { defineStory } = defineStoryFactory();

export const dividerStory = defineStory({
  Component: DividerPreview,
  displayName: "Divider",
});

export const DividerStory = dividerStory.WithControl;
