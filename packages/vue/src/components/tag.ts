import { defineComponent, h } from "vue";

export const Tag = defineComponent({
	name: "Tag",
	inheritAttrs: false,
	props: {
		variant: String,
		outlined: Boolean,
	},
	setup(props, { attrs, slots }) {
		return () =>
			h(
				"span",
				{
					...attrs,
					class: ["ore-tag", attrs.class],
					  "data-variant": props.variant,
					  "data-outlined": props.outlined ? "" : undefined,
				},
				slots.default?.(),
			);
	},
});
