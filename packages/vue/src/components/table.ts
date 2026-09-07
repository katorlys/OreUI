import "oreui-web/table";
import type { OreTableSortDetail, OreTableVariant } from "oreui-web/table";
import { defineComponent, h, type PropType } from "vue";

export const Table = defineComponent({
  name: "Table",
  inheritAttrs: false,
  props: {
    variant: String as PropType<OreTableVariant>,
  },
  emits: {
    sort: (event: CustomEvent<OreTableSortDetail>) =>
      event instanceof CustomEvent,
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          "data-variant": props.variant,
          class: ["ore-table", "ore-scrollbar", attrs.class],
          onSort: (event: CustomEvent<OreTableSortDetail>) =>
            emit("sort", event),
        },
        slots.default?.(),
      );
  },
});
