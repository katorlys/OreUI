import {
  defineComponent,
  h,
  type ComponentPublicInstance,
} from "vue";

export const ProgressBar = defineComponent({
  name: "ProgressBar",
  inheritAttrs: false,
  setup(_, { attrs, expose }) {
    let element: HTMLProgressElement | undefined;

    expose({
      get element() {
        return element;
      },
    });

    return () =>
      h("progress", {
        ...attrs,
        ref: (value: Element | ComponentPublicInstance | null) => {
          element = value instanceof HTMLProgressElement ? value : undefined;
        },
        class: ["ore-progress-bar", attrs.class],
      });
  },
});
