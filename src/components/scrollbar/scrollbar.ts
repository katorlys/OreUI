export type OreScrollbarElement = HTMLElement;

const scrollbarSelector = ".ore-scrollbar";
const states = new WeakMap<OreScrollbarElement, ScrollbarState>();

interface ScrollbarState {
	customScrollbar: CustomScrollbarState | null;
	managesTabIndex: boolean;
	managedTabIndex: string | null;
	mutationObserver: MutationObserver;
	resizeObserver: ResizeObserver;
	tabIndexObserver: MutationObserver;
}

interface CustomScrollbarState {
	dragAxis: "vertical" | "horizontal" | null;
	dragStart: number;
	horizontalThumb: HTMLDivElement;
	horizontalTrack: HTMLDivElement;
	scrollStart: number;
	verticalThumb: HTMLDivElement;
	verticalTrack: HTMLDivElement;
}

function supportsCustomScrollbar(): boolean {
	return typeof CSS !== "undefined" && CSS.supports("-moz-appearance", "none");
}

function createCustomScrollbar(
	scrollbar: OreScrollbarElement,
): CustomScrollbarState {
	const verticalTrack = document.createElement("div");
	verticalTrack.className =
		"ore-scrollbar-track ore-scrollbar-track-vertical";
	verticalTrack.setAttribute("aria-hidden", "true");
	const verticalThumb = document.createElement("div");
	verticalThumb.className =
		"ore-scrollbar-thumb ore-scrollbar-thumb-vertical";
	verticalThumb.setAttribute("aria-hidden", "true");
	verticalTrack.append(verticalThumb);

	const horizontalTrack = document.createElement("div");
	horizontalTrack.className =
		"ore-scrollbar-track ore-scrollbar-track-horizontal";
	horizontalTrack.setAttribute("aria-hidden", "true");
	const horizontalThumb = document.createElement("div");
	horizontalThumb.className =
		"ore-scrollbar-thumb ore-scrollbar-thumb-horizontal";
	horizontalThumb.setAttribute("aria-hidden", "true");
	horizontalTrack.append(horizontalThumb);

	scrollbar.prepend(verticalTrack);
	scrollbar.append(horizontalTrack);

	return {
		dragAxis: null,
		dragStart: 0,
		horizontalThumb,
		horizontalTrack,
		scrollStart: 0,
		verticalThumb,
		verticalTrack,
	};
}

function readPixelVariable(
	scrollbar: OreScrollbarElement,
	name: string,
	fallback: number,
): number {
	return Number.parseFloat(getComputedStyle(scrollbar).getPropertyValue(name)) || fallback;
}

function syncCustomScrollbar(
	scrollbar: OreScrollbarElement,
	customScrollbar: CustomScrollbarState | null,
): void {
	if (!customScrollbar) {
		return;
	}

	const hasVertical = scrollbar.scrollHeight > scrollbar.clientHeight;
	const hasHorizontal = scrollbar.scrollWidth > scrollbar.clientWidth;
	const verticalSize = readPixelVariable(scrollbar, "--ore-scrollbar-size", 12);
	const horizontalSize = readPixelVariable(
		scrollbar,
		"--ore-scrollbar-horizontal-size",
		16,
	);
	const thumbMinSize = readPixelVariable(
		scrollbar,
		"--ore-scrollbar-thumb-min-size",
		24,
	);
	const verticalTrackSize = Math.max(
		0,
		scrollbar.clientHeight - (hasHorizontal ? horizontalSize : 0),
	);
	const horizontalTrackSize = Math.max(
		0,
		scrollbar.clientWidth - (hasVertical ? verticalSize : 0),
	);

	customScrollbar.verticalTrack.hidden = !hasVertical;
	customScrollbar.horizontalTrack.hidden = !hasHorizontal;
	scrollbar.style.setProperty(
		"--ore-scrollbar-vertical-track-size",
		`${verticalTrackSize}px`,
	);
	scrollbar.style.setProperty(
		"--ore-scrollbar-horizontal-track-size",
		`${horizontalTrackSize}px`,
	);

	if (hasVertical) {
		const thumbSize = Math.max(
			thumbMinSize,
			(verticalTrackSize * scrollbar.clientHeight) / scrollbar.scrollHeight,
		);
		const travel = verticalTrackSize - thumbSize;
		customScrollbar.verticalThumb.style.height = `${thumbSize}px`;
		customScrollbar.verticalThumb.style.transform = `translateY(${(travel * scrollbar.scrollTop) / (scrollbar.scrollHeight - scrollbar.clientHeight)}px)`;
	}

	if (hasHorizontal) {
		const thumbSize = Math.max(
			thumbMinSize,
			(horizontalTrackSize * scrollbar.clientWidth) / scrollbar.scrollWidth,
		);
		const travel = horizontalTrackSize - thumbSize;
		customScrollbar.horizontalThumb.style.width = `${thumbSize}px`;
		customScrollbar.horizontalThumb.style.transform = `translateX(${(travel * scrollbar.scrollLeft) / (scrollbar.scrollWidth - scrollbar.clientWidth)}px)`;
	}
}

function syncScrollbar(scrollbar: OreScrollbarElement): void {
	const state = states.get(scrollbar);

	if (!state) {
		return;
	}

	if (state.managesTabIndex) {
		const scrollable =
			scrollbar.scrollHeight > scrollbar.clientHeight ||
			scrollbar.scrollWidth > scrollbar.clientWidth;
		const tabIndex = scrollable ? "0" : "-1";

		state.managedTabIndex = tabIndex;
		scrollbar.setAttribute("tabindex", tabIndex);
	}

	syncCustomScrollbar(scrollbar, state.customScrollbar);
}

function observeScrollbarContent(scrollbar: OreScrollbarElement): void {
	const state = states.get(scrollbar);

	if (!state) {
		return;
	}

	state.resizeObserver.disconnect();
	state.resizeObserver.observe(scrollbar);

	for (const child of scrollbar.children) {
		if (!child.classList.contains("ore-scrollbar-track")) {
			state.resizeObserver.observe(child);
		}
	}
}

function handleScroll(event: Event): void {
	if (!(event.currentTarget instanceof HTMLElement)) {
		return;
	}

	const state = states.get(event.currentTarget);
	syncCustomScrollbar(event.currentTarget, state?.customScrollbar ?? null);
}

function handlePointerDown(event: PointerEvent): void {
	if (
		!(event.currentTarget instanceof HTMLElement) ||
		!(event.target instanceof HTMLElement)
	) {
		return;
	}

	const scrollbar = event.currentTarget;
	const customScrollbar = states.get(scrollbar)?.customScrollbar;

	if (!customScrollbar) {
		return;
	}

	if (event.target === customScrollbar.verticalThumb) {
		customScrollbar.dragAxis = "vertical";
		customScrollbar.dragStart = event.clientY;
		customScrollbar.scrollStart = scrollbar.scrollTop;
	} else if (event.target === customScrollbar.horizontalThumb) {
		customScrollbar.dragAxis = "horizontal";
		customScrollbar.dragStart = event.clientX;
		customScrollbar.scrollStart = scrollbar.scrollLeft;
	} else {
		return;
	}

	event.target.setPointerCapture(event.pointerId);
	event.preventDefault();
}

function handlePointerMove(event: PointerEvent): void {
	if (!(event.currentTarget instanceof HTMLElement)) {
		return;
	}

	const scrollbar = event.currentTarget;
	const customScrollbar = states.get(scrollbar)?.customScrollbar;

	if (!customScrollbar?.dragAxis) {
		return;
	}

	const vertical = customScrollbar.dragAxis === "vertical";
	const track = vertical
		? customScrollbar.verticalTrack
		: customScrollbar.horizontalTrack;
	const thumb = vertical
		? customScrollbar.verticalThumb
		: customScrollbar.horizontalThumb;
	const trackSize = vertical ? track.clientHeight : track.clientWidth;
	const thumbSize = vertical ? thumb.clientHeight : thumb.clientWidth;

	if (trackSize <= thumbSize) {
		return;
	}

	const pointer = vertical ? event.clientY : event.clientX;
	const scrollSize = vertical
		? scrollbar.scrollHeight - scrollbar.clientHeight
		: scrollbar.scrollWidth - scrollbar.clientWidth;
	const scroll =
		customScrollbar.scrollStart +
		((pointer - customScrollbar.dragStart) * scrollSize) /
			(trackSize - thumbSize);

	if (vertical) {
		scrollbar.scrollTop = scroll;
	} else {
		scrollbar.scrollLeft = scroll;
	}
}

function handlePointerEnd(event: PointerEvent): void {
	if (!(event.currentTarget instanceof HTMLElement)) {
		return;
	}

	const customScrollbar = states.get(event.currentTarget)?.customScrollbar;

	if (customScrollbar) {
		customScrollbar.dragAxis = null;
	}
}

function handleKeydown(event: KeyboardEvent): void {
	if (!(event.currentTarget instanceof HTMLElement)) {
		return;
	}

	const scrollbar = event.currentTarget;

	if (event.target !== scrollbar) {
		return;
	}

	const vertical = scrollbar.scrollHeight > scrollbar.clientHeight;
	const offsets: Partial<Record<string, ScrollToOptions>> = {
		ArrowDown: { top: 40 },
		ArrowLeft: { left: -40 },
		ArrowRight: { left: 40 },
		ArrowUp: { top: -40 },
		PageDown: vertical
			? { top: scrollbar.clientHeight }
			: { left: scrollbar.clientWidth },
		PageUp: vertical
			? { top: -scrollbar.clientHeight }
			: { left: -scrollbar.clientWidth },
	};

	if (event.key === "Home" || event.key === "End") {
		event.preventDefault();
		if (vertical) {
			scrollbar.scrollTop = event.key === "Home" ? 0 : scrollbar.scrollHeight;
		} else {
			scrollbar.scrollLeft = event.key === "Home" ? 0 : scrollbar.scrollWidth;
		}
		return;
	}

	const offset = offsets[event.key];

	if (offset) {
		event.preventDefault();
		scrollbar.scrollBy(offset);
	}
}

export function initScrollbar(scrollbar: OreScrollbarElement): void {
	if (states.has(scrollbar)) {
		syncScrollbar(scrollbar);
		return;
	}

	const state: ScrollbarState = {
		customScrollbar: null,
		managesTabIndex: !scrollbar.hasAttribute("tabindex"),
		managedTabIndex: null,
		mutationObserver: new MutationObserver(() => {
			observeScrollbarContent(scrollbar);
			syncScrollbar(scrollbar);
		}),
		resizeObserver: new ResizeObserver(() => syncScrollbar(scrollbar)),
		tabIndexObserver: new MutationObserver(() => {
			if (scrollbar.getAttribute("tabindex") !== state.managedTabIndex) {
				state.managesTabIndex = false;
			}
		}),
	};

	states.set(scrollbar, state);
	scrollbar.dataset.oreInitialized = "scrollbar";
	if (supportsCustomScrollbar()) {
		state.customScrollbar = createCustomScrollbar(scrollbar);
	}
	scrollbar.addEventListener("keydown", handleKeydown);
	scrollbar.addEventListener("pointercancel", handlePointerEnd);
	scrollbar.addEventListener("pointerdown", handlePointerDown);
	scrollbar.addEventListener("pointermove", handlePointerMove);
	scrollbar.addEventListener("pointerup", handlePointerEnd);
	scrollbar.addEventListener("scroll", handleScroll, { passive: true });
	state.mutationObserver.observe(scrollbar, {
		characterData: true,
		childList: true,
		subtree: true,
	});
	state.tabIndexObserver.observe(scrollbar, {
		attributeFilter: ["tabindex"],
	});
	observeScrollbarContent(scrollbar);
	syncScrollbar(scrollbar);
	queueMicrotask(() => syncScrollbar(scrollbar));
}

export function destroyScrollbar(scrollbar: OreScrollbarElement): void {
	const state = states.get(scrollbar);

	if (!state) {
		return;
	}

	scrollbar.removeEventListener("keydown", handleKeydown);
	scrollbar.removeEventListener("pointercancel", handlePointerEnd);
	scrollbar.removeEventListener("pointerdown", handlePointerDown);
	scrollbar.removeEventListener("pointermove", handlePointerMove);
	scrollbar.removeEventListener("pointerup", handlePointerEnd);
	scrollbar.removeEventListener("scroll", handleScroll);
	state.mutationObserver.disconnect();
	state.resizeObserver.disconnect();
	state.tabIndexObserver.disconnect();
	state.customScrollbar?.verticalTrack.remove();
	state.customScrollbar?.horizontalTrack.remove();
	scrollbar.style.removeProperty("--ore-scrollbar-vertical-track-size");
	scrollbar.style.removeProperty("--ore-scrollbar-horizontal-track-size");
	delete scrollbar.dataset.oreInitialized;
	states.delete(scrollbar);
}

export function initScrollbars(root: ParentNode = document): void {
	if (root instanceof HTMLElement && root.matches(scrollbarSelector)) {
		initScrollbar(root);
	}

	for (const scrollbar of root.querySelectorAll<OreScrollbarElement>(
		scrollbarSelector,
	)) {
		initScrollbar(scrollbar);
	}
}

if (typeof document !== "undefined") {
	initScrollbars();

	new MutationObserver((records) => {
		for (const record of records) {
			for (const node of record.addedNodes) {
				if (node instanceof HTMLElement) {
					initScrollbars(node);
				}
			}

			for (const node of record.removedNodes) {
				if (node instanceof HTMLElement && node.matches(scrollbarSelector)) {
					destroyScrollbar(node);
				}

				if (node instanceof HTMLElement) {
					for (const scrollbar of node.querySelectorAll<OreScrollbarElement>(
						scrollbarSelector,
					)) {
						destroyScrollbar(scrollbar);
					}
				}
			}
		}
	}).observe(document.documentElement, { childList: true, subtree: true });
}
