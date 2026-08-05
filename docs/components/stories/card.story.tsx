"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Card } from "@katorlys/oreui-react/card";
import { Tag } from "@katorlys/oreui-react/tag";
import { createElement } from "react";

interface CardPreviewProps {
  description: string;
  showMedia: boolean;
  title: string;
}

function CardPreview({ description, showMedia, title }: CardPreviewProps) {
  return (
    <Card>
      {showMedia ? (
        <div className="ore-card-media">
          <img
            alt="Sunlight through a forest"
            src="https://images.unsplash.com/photo-1697479670670-d2a299df749c?auto=format&fit=crop&w=900&q=80"
          />
          <div
            className="ore-card-overlay-bottom-start"
            style={{ display: "flex", gap: "var(--ore-card-unit)" }}
          >
            <Tag outlined variant="informative">
              Local
            </Tag>
            <Tag outlined variant="notice">
              New
            </Tag>
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
    </Card>
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
