export type OreSliderColor =
  | "destructive"
  | "dungeons"
  | "gold"
  | "legends"
  | "primary"
  | "realms"
  | "secondary";
export type OreSliderVariant = "default" | "segmented";
export type OreSliderOrientation = "horizontal" | "vertical";

const sliderSelector = "input.ore-slider";
const sliderAttributes = ["max", "min", "step", "value"];

export function syncSlider(slider: HTMLInputElement): void {
  const minValue = Number(slider.min);
  const maxValue = Number(slider.max);
  const min = slider.min !== "" && Number.isFinite(minValue) ? minValue : 0;
  const max = slider.max !== "" && Number.isFinite(maxValue) ? maxValue : 100;
  const value = slider.valueAsNumber;
  const size = max - min;
  const progress = size > 0 ? (value - min) / size : 0;
  const stepValue = Number(slider.step);
  const step =
    slider.step === "any"
      ? size
      : slider.step !== "" && Number.isFinite(stepValue)
        ? stepValue
        : 1;
  const segmentSize = size > 0 && step > 0 ? Math.min(step / size, 1) : 1;

  slider.style.setProperty(
    "--ore-slider-progress-end",
    String(Math.min(1, Math.max(0, progress))),
  );
  slider.style.setProperty(
    "--ore-slider-segment-size",
    `${segmentSize * 100}%`,
  );
}

function initSlider(slider: HTMLInputElement): void {
  if (slider.dataset.oreInitialized === "slider") {
    syncSlider(slider);
    return;
  }

  slider.dataset.oreInitialized = "slider";
  slider.addEventListener("input", () => syncSlider(slider));
  slider.form?.addEventListener("reset", () =>
    queueMicrotask(() => syncSlider(slider)),
  );
  syncSlider(slider);
}

export function initSliders(root: ParentNode = document): void {
  if (root instanceof HTMLInputElement && root.matches(sliderSelector)) {
    initSlider(root);
  }

  for (const slider of root.querySelectorAll<HTMLInputElement>(
    sliderSelector,
  )) {
    initSlider(slider);
  }
}

if (typeof document !== "undefined") {
  initSliders();

  new MutationObserver((records) => {
    for (const record of records) {
      if (
        record.type === "attributes" &&
        record.target instanceof HTMLInputElement &&
        record.target.matches(sliderSelector)
      ) {
        syncSlider(record.target);
        continue;
      }

      for (const node of record.addedNodes) {
        if (node instanceof HTMLElement) {
          initSliders(node);
        }
      }
    }
  }).observe(document.documentElement, {
    attributeFilter: sliderAttributes,
    attributes: true,
    childList: true,
    subtree: true,
  });
}
