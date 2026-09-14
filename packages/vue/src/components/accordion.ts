import { defineComponent, h } from "vue";

export const Accordion = defineComponent({
  name: "Accordion",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        "details",
        {
          ...attrs,
          class: ["ore-accordion", attrs.class],
        },
        slots.default?.(),
      );
  },
});
