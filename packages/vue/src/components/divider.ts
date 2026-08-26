import { defineComponent, h } from "vue";

export const Divider = defineComponent({
  name: "Divider",
  inheritAttrs: false,
  setup(_, { attrs }) {
    return () => h("hr", { ...attrs, class: ["ore-divider", attrs.class] });
  },
});
