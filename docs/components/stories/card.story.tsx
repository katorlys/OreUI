"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreCard } from "@katorlys/oreui-react/card";
import { OreTag } from "@katorlys/oreui-react/tag";
import { createElement } from "react";

interface CardPreviewProps {
  description: string;
  showMedia: boolean;
  title: string;
}

function CardPreview({ description, showMedia, title }: CardPreviewProps) {
  return (
    <OreCard>
      {showMedia ? (
        <div className="ore-card-media">
          <img
            alt="Sunlight through a forest"
            src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80"
          />
          <div
            className="ore-card-overlay-bottom-start"
            style={{ display: "flex", gap: "var(--ore-card-unit)" }}
          >
            <OreTag outlined variant="informative">
              Local
            </OreTag>
            <OreTag outlined variant="notice">
              New
            </OreTag>
          </div>
          <span aria-hidden="true" className="ore-card-overlay-top-end">
            {createElement(
              "ore-icon",
              null,
              <svg viewBox="0 0 8 8">
                <path
                  d="M1 2h1v1H1zm1 1h1v1H2zm1 1h1v1H3zm1 1h1v1H4zm1-1h1v1H5zm1-1h1v1H6z"
                  fill="currentColor"
                />
              </svg>,
            )}
          </span>
        </div>
      ) : null}
      <div className="ore-card-body">
        <div className="ore-card-caption">
          <div className="ore-card-title">{title}</div>
          <div className="ore-card-description">{description}</div>
        </div>
        <span className="ore-card-meta">1.21</span>
      </div>
    </OreCard>
  );
}

const { defineStory } = defineStoryFactory();

export const cardStory = defineStory({
  Component: CardPreview,
  displayName: "Card",
  args: {
    initial: {
      description: "05/15/26",
      showMedia: true,
      title: "Creative world",
    },
  },
});

export const CardStory = cardStory.WithControl;