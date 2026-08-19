import { ReactiveElement } from "lit";

export class OreScrollbar extends ReactiveElement {
  #managesTabIndex = false;
  #managedTabIndex: string | null = null;
  #tabIndexInitialized = false;
  #initialSync: number | undefined;
  #verticalTrack: HTMLDivElement | null = null;
  #verticalThumb: HTMLDivElement | null = null;
  #horizontalTrack: HTMLDivElement | null = null;
  #horizontalThumb: HTMLDivElement | null = null;
  #dragAxis: "vertical" | "horizontal" | null = null;
  #dragStart = 0;
  #scrollStart = 0;
  readonly #resizeObserver = new ResizeObserver(() => this.#syncTabIndex());
  readonly #tabIndexObserver = new MutationObserver(() => {
    if (this.getAttribute("tabindex") !== this.#managedTabIndex) {
      this.#managesTabIndex = false;
    }
  });
  readonly #mutationObserver = new MutationObserver(() => {
    this.#observeContent();
    this.#syncTabIndex();
  });

  override connectedCallback(): void {
    super.connectedCallback();

    this.#createScrollbarParts();

    if (!this.#tabIndexInitialized) {
      this.#managesTabIndex = !this.hasAttribute("tabindex");
      this.#tabIndexInitialized = true;
    }

    this.addEventListener("keydown", this.#handleKeydown);
    this.addEventListener("scroll", this.#handleScroll, { passive: true });
    this.addEventListener("pointerdown", this.#handlePointerDown);
    this.addEventListener("pointermove", this.#handlePointerMove);
    this.addEventListener("pointerup", this.#handlePointerEnd);
    this.addEventListener("pointercancel", this.#handlePointerEnd);
    this.#mutationObserver.observe(this, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    this.#tabIndexObserver.observe(this, {
      attributeFilter: ["tabindex"],
    });
    this.#observeContent();
    this.#syncTabIndex();
    this.#initialSync = window.setTimeout(() => this.#syncTabIndex());
  }

  override disconnectedCallback(): void {
    this.removeEventListener("keydown", this.#handleKeydown);
    this.removeEventListener("scroll", this.#handleScroll);
    this.removeEventListener("pointerdown", this.#handlePointerDown);
    this.removeEventListener("pointermove", this.#handlePointerMove);
    this.removeEventListener("pointerup", this.#handlePointerEnd);
    this.removeEventListener("pointercancel", this.#handlePointerEnd);
    this.#resizeObserver.disconnect();
    this.#mutationObserver.disconnect();
    this.#tabIndexObserver.disconnect();
    window.clearTimeout(this.#initialSync);
    super.disconnectedCallback();
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  #observeContent(): void {
    this.#resizeObserver.disconnect();
    this.#resizeObserver.observe(this);

    for (const child of this.children) {
      if (!child.classList.contains("ore-scrollbar-track")) {
        this.#resizeObserver.observe(child);
      }
    }
  }

  #syncTabIndex(): void {
    if (this.#managesTabIndex) {
      const scrollable =
        this.scrollHeight > this.clientHeight ||
        this.scrollWidth > this.clientWidth;
      const tabIndex = scrollable ? 0 : -1;

      this.#managedTabIndex = String(tabIndex);
      this.tabIndex = tabIndex;
    }

    this.#syncScrollbars();
  }

  #createScrollbarParts(): void {
    if (this.#verticalTrack) {
      return;
    }

    this.#verticalTrack = document.createElement("div");
    this.#verticalTrack.className =
      "ore-scrollbar-track ore-scrollbar-track-vertical";
    this.#verticalTrack.setAttribute("aria-hidden", "true");
    this.#verticalThumb = document.createElement("div");
    this.#verticalThumb.className =
      "ore-scrollbar-thumb ore-scrollbar-thumb-vertical";
    this.#verticalThumb.setAttribute("aria-hidden", "true");
    this.#verticalTrack.append(this.#verticalThumb);

    this.#horizontalTrack = document.createElement("div");
    this.#horizontalTrack.className =
      "ore-scrollbar-track ore-scrollbar-track-horizontal";
    this.#horizontalTrack.setAttribute("aria-hidden", "true");
    this.#horizontalThumb = document.createElement("div");
    this.#horizontalThumb.className =
      "ore-scrollbar-thumb ore-scrollbar-thumb-horizontal";
    this.#horizontalThumb.setAttribute("aria-hidden", "true");
    this.#horizontalTrack.append(this.#horizontalThumb);

    this.prepend(this.#verticalTrack);
    this.append(this.#horizontalTrack);
  }

  #syncScrollbars(): void {
    if (
      !this.#verticalTrack ||
      !this.#verticalThumb ||
      !this.#horizontalTrack ||
      !this.#horizontalThumb
    ) {
      return;
    }

    const hasVertical = this.scrollHeight > this.clientHeight;
    const hasHorizontal = this.scrollWidth > this.clientWidth;
    const verticalTrackSize = Math.max(
      0,
      this.clientHeight - (hasHorizontal ? this.#horizontalSize : 0),
    );
    const horizontalTrackSize = Math.max(
      0,
      this.clientWidth - (hasVertical ? this.#verticalSize : 0),
    );

    this.#verticalTrack.hidden = !hasVertical;
    this.#horizontalTrack.hidden = !hasHorizontal;
    this.style.setProperty(
      "--ore-scrollbar-vertical-track-size",
      `${verticalTrackSize}px`,
    );
    this.style.setProperty(
      "--ore-scrollbar-horizontal-track-size",
      `${horizontalTrackSize}px`,
    );
    if (hasVertical) {
      const thumbSize = Math.max(
        this.#thumbMinSize,
        (verticalTrackSize * this.clientHeight) / this.scrollHeight,
      );
      const travel = verticalTrackSize - thumbSize;
      this.#verticalThumb.style.height = `${thumbSize}px`;
      this.#verticalThumb.style.transform = `translateY(${(travel * this.scrollTop) / (this.scrollHeight - this.clientHeight)}px)`;
    }

    if (hasHorizontal) {
      const thumbSize = Math.max(
        this.#thumbMinSize,
        (horizontalTrackSize * this.clientWidth) / this.scrollWidth,
      );
      const travel = horizontalTrackSize - thumbSize;
      this.#horizontalThumb.style.width = `${thumbSize}px`;
      this.#horizontalThumb.style.transform = `translateX(${(travel * this.scrollLeft) / (this.scrollWidth - this.clientWidth)}px)`;
    }
  }

  get #verticalSize(): number {
    return (
      parseFloat(
        getComputedStyle(this).getPropertyValue("--ore-scrollbar-size"),
      ) || 12
    );
  }

  get #horizontalSize(): number {
    return (
      parseFloat(
        getComputedStyle(this).getPropertyValue(
          "--ore-scrollbar-horizontal-size",
        ),
      ) || 16
    );
  }

  get #thumbMinSize(): number {
    return (
      parseFloat(
        getComputedStyle(this).getPropertyValue(
          "--ore-scrollbar-thumb-min-size",
        ),
      ) || 24
    );
  }

  readonly #handleScroll = (): void => this.#syncScrollbars();

  readonly #handlePointerDown = (event: PointerEvent): void => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    if (event.target === this.#verticalThumb) {
      this.#dragAxis = "vertical";
      this.#dragStart = event.clientY;
      this.#scrollStart = this.scrollTop;
    } else if (event.target === this.#horizontalThumb) {
      this.#dragAxis = "horizontal";
      this.#dragStart = event.clientX;
      this.#scrollStart = this.scrollLeft;
    } else {
      return;
    }

    event.target.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  readonly #handlePointerMove = (event: PointerEvent): void => {
    if (!this.#dragAxis) {
      return;
    }

    const vertical = this.#dragAxis === "vertical";
    const track = vertical ? this.#verticalTrack : this.#horizontalTrack;
    const thumb = vertical ? this.#verticalThumb : this.#horizontalThumb;
    const trackSize = vertical ? track?.clientHeight : track?.clientWidth;
    const thumbSize = vertical ? thumb?.clientHeight : thumb?.clientWidth;

    if (!trackSize || !thumbSize || trackSize <= thumbSize) {
      return;
    }

    const pointer = vertical ? event.clientY : event.clientX;
    const scrollSize = vertical
      ? this.scrollHeight - this.clientHeight
      : this.scrollWidth - this.clientWidth;
    const scroll =
      this.#scrollStart +
      ((pointer - this.#dragStart) * scrollSize) / (trackSize - thumbSize);

    if (vertical) {
      this.scrollTop = scroll;
    } else {
      this.scrollLeft = scroll;
    }
  };

  readonly #handlePointerEnd = (): void => {
    this.#dragAxis = null;
  };

  readonly #handleKeydown = (event: KeyboardEvent): void => {
    if (event.target !== this) {
      return;
    }

    const vertical = this.scrollHeight > this.clientHeight;
    const scrollBy: Partial<Record<string, { left?: number; top?: number }>> = {
      ArrowDown: { top: 40 },
      ArrowLeft: { left: -40 },
      ArrowRight: { left: 40 },
      ArrowUp: { top: -40 },
      PageDown: vertical
        ? { top: this.clientHeight }
        : { left: this.clientWidth },
      PageUp: vertical
        ? { top: -this.clientHeight }
        : { left: -this.clientWidth },
    };

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      if (vertical) {
        this.scrollTop = event.key === "Home" ? 0 : this.scrollHeight;
      } else {
        this.scrollLeft = event.key === "Home" ? 0 : this.scrollWidth;
      }
      return;
    }

    const offset = scrollBy[event.key];

    if (offset) {
      event.preventDefault();
      this.scrollBy(offset);
    }
  };
}

if (!customElements.get("ore-scrollbar")) {
  customElements.define("ore-scrollbar", OreScrollbar);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-scrollbar": OreScrollbar;
  }
}
