import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement ResizeObserver. Chakra UI's positioned
// components (Menu, Popover, Tooltip, etc.) use it internally via
// @zag-js/popper for auto-updating placement, so without this stub
// any test that opens one of these throws an unhandled
// "ResizeObserver is not defined" rejection.
class ResizeObserverStub {
  observe() {
    // no-op: layout tracking isn't needed in tests
  }

  unobserve() {
    // no-op: layout tracking isn't needed in tests
  }

  disconnect() {
    // no-op: layout tracking isn't needed in tests
  }
}

if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = ResizeObserverStub;
}
