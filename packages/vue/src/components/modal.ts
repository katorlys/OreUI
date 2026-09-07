import { defineComponent, h } from "vue";

export const Modal = defineComponent({
  name: "Modal",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        "dialog",
        {
          ...attrs,
          class: ["ore-modal", attrs.class],
        },
        slots.default?.(),
      );
  },
});
