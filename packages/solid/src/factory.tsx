import {
  createRenderEffect,
  onCleanup,
  onMount,
  splitProps,
  type JSX,
} from "solid-js";
import { Dynamic } from "solid-js/web";

import type { OreRef } from "./types.js";

type EventMap = Readonly<Record<string, string>>;

type ModelOptions<Element extends HTMLElement> = {
  callback: string;
  event: string;
  property: keyof Element;
};

type ComponentOptions<Element extends HTMLElement> = {
  events?: EventMap;
  model?: ModelOptions<Element>;
  properties?: readonly (keyof Element)[];
  tagName: string;
};

type ComponentProps<Element extends HTMLElement> = Record<string, unknown> & {
  ref?: OreRef<Element>;
};

export function createOreComponent<
  Element extends HTMLElement,
  Props extends ComponentProps<Element>,
>(options: ComponentOptions<Element>): (props: Props) => JSX.Element {
  const properties = options.properties ?? [];
  const events = options.events ?? {};
  const localNames = [
    "ref",
    ...properties.map(String),
    ...Object.keys(events),
    ...(options.model ? [options.model.callback] : []),
  ];

  return (props: Props): JSX.Element => {
    const [local, forwarded] = splitProps(props, localNames as (keyof Props)[]);
    let element: Element | undefined;

    const setElement = (value: Element): void => {
      element = value;

      for (const property of properties) {
        const propertyValue = local[property as keyof typeof local];

        if (propertyValue !== undefined) {
          value[property] = propertyValue as Element[typeof property];
        }
      }

      const ref = local.ref as OreRef<Element> | undefined;
      ref?.(value);
    };

    for (const property of properties) {
      createRenderEffect(() => {
        const value = local[property as keyof typeof local];

        if (element && value !== undefined) {
          element[property] = value as Element[typeof property];
        }
      });
    }

    onMount(() => {
      if (!element) {
        return;
      }

      const listeners: Array<[string, EventListener]> = [];

      for (const [prop, eventName] of Object.entries(events)) {
        const listener: EventListener = (event) => {
          const callback = local[prop as keyof typeof local];

          if (typeof callback === "function") {
            callback(event);
          }
        };
        element.addEventListener(eventName, listener);
        listeners.push([eventName, listener]);
      }

      if (options.model) {
        const model = options.model;
        const listener: EventListener = () => {
          const callback = local[model.callback as keyof typeof local];

          if (typeof callback === "function" && element) {
            callback(element[model.property]);
          }
        };
        element.addEventListener(model.event, listener);
        listeners.push([model.event, listener]);
      }

      onCleanup(() => {
        for (const [eventName, listener] of listeners) {
          element?.removeEventListener(eventName, listener);
        }
      });
    });

    return (
      <Dynamic component={options.tagName} ref={setElement} {...forwarded} />
    );
  };
}
