import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { trackPokemonViewed } from "~/lib/analytics";
import { RecordRecentlyViewed } from "./RecordRecentlyViewed";
import { clearRecentlyViewed, getRecentlyViewed } from "./recently-viewed.store";

vi.mock("~/lib/analytics", () => ({
  trackPokemonViewed: vi.fn(),
}));

const pikachu = { id: 25, name: "pikachu", image: "/pikachu.png" };
const bulbasaur = { id: 1, name: "bulbasaur", image: null };

beforeEach(() => {
  clearRecentlyViewed();
  vi.clearAllMocks();
});

describe("RecordRecentlyViewed", () => {
  it("renders nothing", () => {
    const { container } = render(
      <RecordRecentlyViewed pokemon={pikachu} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("records the pokemon as recently viewed on mount", () => {
    render(<RecordRecentlyViewed pokemon={pikachu} />);
    const items = getRecentlyViewed();
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject(pikachu);
    expect(trackPokemonViewed).toHaveBeenCalledWith(pikachu);
  });

  it("records the new pokemon when the viewed id changes", () => {
    const { rerender } = render(
      <RecordRecentlyViewed pokemon={pikachu} />,
    );
    rerender(<RecordRecentlyViewed pokemon={bulbasaur} />);

    const items = getRecentlyViewed();
    expect(items.map((item) => item.id)).toEqual([
      bulbasaur.id,
      pikachu.id,
    ]);
    expect(trackPokemonViewed).toHaveBeenNthCalledWith(1, pikachu);
    expect(trackPokemonViewed).toHaveBeenNthCalledWith(2, bulbasaur);
  });

  it("does not double-record on a re-render with the same id", () => {
    const { rerender } = render(
      <RecordRecentlyViewed pokemon={pikachu} />,
    );
    rerender(<RecordRecentlyViewed pokemon={{ ...pikachu }} />);

    expect(getRecentlyViewed()).toHaveLength(1);
    expect(trackPokemonViewed).toHaveBeenCalledTimes(1);
  });
});
