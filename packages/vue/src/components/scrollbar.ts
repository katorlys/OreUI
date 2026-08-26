import "oreui-web/scrollbar";
import {
  defineComponent,
  h,
  type ComponentPublicInstance,
} from "vue";

export const Scrollbar = defineComponent({
  name: "Scrollbar",
  inheritAttrs: false,
  setup(_, { attrs, expose, slots }) {
    let element: HTMLDivElement | undefined;

    expose({
      get element() {
        return element;
      },
    });

    return () =>
      h(
        "div",
        {
          ...attrs,
          ref: (value: Element | ComponentPublicInstance | null) => {
            element = value instanceof HTMLDivElement ? value : undefined;
          },
          class: ["ore-scrollbar", attrs.class],
        },
        slots.default?.(),
      );
  },
});
