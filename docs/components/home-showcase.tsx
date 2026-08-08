"use client";

import { type CSSProperties, useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  Dropdown,
  ProgressBar,
  Radio,
  RadioGroup,
  Slider,
  Spinner,
  Switch,
  Tag,
  Textfield,
} from "@katorlys/oreui-react";

const textfieldStyle = {
  "--ore-textfield-description": "var(--color-fd-muted-foreground)",
  "--ore-textfield-foreground": "var(--color-fd-foreground)",
} as CSSProperties;

export function HomeShowcase() {
  const [mounted, setMounted] = useState(false);
  const [distance, setDistance] = useState(12);
  const [mode, setMode] = useState("survival");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);

    const interval = window.setInterval(() => {
      setProgress((value) => (value >= 100 ? 0 : value + 1));
    }, 60);

    return () => window.clearInterval(interval);
  }, []);

  if (!mounted) {
    return <div className="min-h-176" aria-hidden="true" />;
  }

  return (
    <section
      className="px-6 py-12 sm:px-10 md:py-16"
      aria-label="OreUI component showcase"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="grid content-start gap-10">
            <div className="grid gap-3">
              <Button type="button" variant="hero">
                Label
              </Button>
              <Button type="button" color="secondary">
                Label
              </Button>
              <Button type="button" color="dungeons" variant="hero">
                Dungeons
              </Button>
              <Button type="button" color="legends" variant="hero">
                Legends
              </Button>
            </div>
            <div className="grid gap-3">
              <Dropdown
                value={mode}
                onChange={(event) => setMode(event.detail.value)}
              >
                <Button
                  className="ore-dropdown-trigger w-full justify-between"
                  type="button"
                  color="secondary"
                >
                  <span className="ore-dropdown-trigger-label">{mode}</span>
                </Button>
                <div className="ore-dropdown-menu">
                  {["survival", "creative", "adventure"].map((item) => (
                    <button
                      className="ore-dropdown-item"
                      data-value={item}
                      type="button"
                      key={item}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </Dropdown>
              <Dropdown
                value="normal"
                variant="bordered"
                onChange={() => undefined}
              >
                <Button
                  className="ore-dropdown-trigger w-full justify-between"
                  type="button"
                  color="secondary"
                >
                  <span className="ore-dropdown-trigger-label">normal</span>
                </Button>
                <div className="ore-dropdown-menu">
                  <button
                    className="ore-dropdown-item"
                    data-value="peaceful"
                    type="button"
                  >
                    peaceful
                  </button>
                  <button
                    className="ore-dropdown-item"
                    data-value="easy"
                    type="button"
                  >
                    easy
                  </button>
                  <button
                    className="ore-dropdown-item"
                    data-value="normal"
                    type="button"
                  >
                    normal
                  </button>
                  <button
                    className="ore-dropdown-item"
                    data-value="hard"
                    type="button"
                    disabled
                  >
                    hard
                  </button>
                </div>
              </Dropdown>
            </div>
          </div>

          <div className="grid content-start gap-10">
            <div className="grid gap-3">
              <Slider
                className="w-full"
                value={distance}
                min={2}
                max={16}
                aria-label="Render distance"
                onInput={(event) =>
                  setDistance(
                    (event.currentTarget as HTMLElement & { value: number })
                      .value,
                  )
                }
              />
              <Slider
                className="w-full"
                value={distance}
                min={2}
                max={16}
                variant="segmented"
                color="gold"
                aria-label="Segmented render distance"
                onInput={(event) =>
                  setDistance(
                    (event.currentTarget as HTMLElement & { value: number })
                      .value,
                  )
                }
              />
            </div>
            <div className="grid gap-3">
              <ProgressBar
                className="w-full"
                variant="labeled"
                value={progress}
                max={100}
              />
            </div>
            <div className="flex flex-row justify-between">
              <Checkbox
                className="text-current"
                style={{ fontFamily: "var(--ore-font-body)" }}
                checked={true}
                name="updates"
                value="yes"
              >
                Receive updates
              </Checkbox>
              <Switch
                className="text-current"
                style={{ fontFamily: "var(--ore-font-body)" }}
                name="autosave"
                value="enabled"
                variant="icons"
              >
                Enable autosave
              </Switch>
            </div>
            <div className="flex flex-row justify-between">
              <RadioGroup
                style={{ fontFamily: "var(--ore-font-body)" }}
                aria-label="Choose type"
              >
                <Radio className="text-current" value="experimental">
                  Experimental
                </Radio>
                <Radio className="text-current" value="education" checked>
                  Education
                </Radio>
              </RadioGroup>
              <RadioGroup
                style={{ fontFamily: "var(--ore-font-body)" }}
                aria-label="Select type"
              >
                <Radio
                  className="text-current"
                  value="realms"
                  color="realms"
                  checked
                >
                  Realms
                </Radio>
                <Radio
                  className="text-current"
                  value="shop"
                  color="gold"
                  disabled
                >
                  Shop
                </Radio>
              </RadioGroup>
              <Spinner className="text-6xl" aria-label="Loading" />
            </div>
          </div>

          <div className="grid content-start gap-10">
            <div className="grid gap-3">
              <Textfield
                className="w-full max-w-none"
                style={textfieldStyle}
                label="Your email"
                description="We won't share your email"
                placeholder="hi@example.com"
              />
              <Textfield
                className="w-full max-w-none"
                style={textfieldStyle}
                label="Username"
                value="Shawn"
              />
              <Textfield
                className="w-full max-w-none"
                style={textfieldStyle}
                label="Label"
                description="Description"
                error="This is an error message."
              />
            </div>
            <div className="grid gap-3">
              <div className="flex flex-wrap gap-3">
                <Tag variant="primary">Primary</Tag>
                <Tag variant="informative">Informative</Tag>
                <Tag variant="notice">Notice</Tag>
                <Tag variant="neutral" outlined>
                  Neutral
                </Tag>
                <Tag variant="realms-informative">Realms</Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
