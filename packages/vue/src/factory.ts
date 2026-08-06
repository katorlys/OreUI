import { defineComponent, h, type Component, type VNode } from "vue";

type ModelOptions = {
  property: string;
  event: string;
  getValue: (element: HTMLElement) => unknown;
};

type ComponentOptions = {
  displayName: string;
  model?: ModelOptions;
};

function toListenerName(event: string): string {
  return `on${event
    .split("-")
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join("")}`;
}

export function createOreComponent(
  tagName: string,
  options: ComponentOptions,
): Component {
  const model = options.model;
  const modelProp = "modelValue";

  return defineComponent({
    name: options.displayName,
    inheritAttrs: false,
    props: model ? { [modelProp]: { required: false } } : undefined,
    emits: model ? ["update:modelValue"] : undefined,
    setup(props, { attrs, slots, expose, emit }) {
      let element: HTMLElement | undefined;

      const setElement = (value: Element | null): void => {
        element = value instanceof HTMLElement ? value : undefined;
      };

      expose({
        get element() {
          return element;
        },
      });

      return (): VNode => {
        const forwardedAttrs = { ...attrs } as Record<string, unknown>;

        if (model) {
          delete forwardedAttrs[modelProp];
          forwardedAttrs[model.property] = props[modelProp];
          const listenerName = toListenerName(model.event);
          const listener = forwardedAttrs[listenerName];

          forwardedAttrs[listenerName] = (event: Event) => {
            if (element) {
              emit("update:modelValue", model.getValue(element));

              if (typeof listener === "function") {
                listener(event);
              }
            }
          };
        }

        const elementAttrs: Record<string, unknown> = {
          ...forwardedAttrs,
          ref: setElement,
        };

        return h(tagName, elementAttrs, slots.default);
      };
    },
  });
}
