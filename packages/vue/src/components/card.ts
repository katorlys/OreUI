import { defineComponent, h } from "vue";

export const Card = defineComponent({
  name: "Card",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        "article",
        {
          ...attrs,
          class: ["ore-card", attrs.class],
        },
        slots.default?.(),
      );
  },
});
