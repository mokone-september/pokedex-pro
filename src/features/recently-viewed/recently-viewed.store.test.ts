import { beforeEach, describe, expect, it } from "vitest";
import {
  MAX_RECENTLY_VIEWED,
  addRecentlyViewed,
  clearRecentlyViewed,
  getRecentlyViewed,
  recentlyViewed$,
  removeRecentlyViewed,
} from "./recently-viewed.store";

const pikachu = { id: 25, name: "pikachu", image: "/pikachu.png" };
const bulbasaur = { id: 1, name: "bulbasaur", image: null };
const charmander = { id: 4, name: "charmander", image: "/charmander.png" };

beforeEach(() => {
  clearRecentlyViewed();
});

describe("addRecentlyViewed", () => {
  it("adds a pokemon to an empty list", () => {
    addRecentlyViewed(pikachu);
    const items = getRecentlyViewed();
    expect(items).toHaveLength(1);
    const [first] = items;
    expect(first).toMatchObject(pikachu);
    expect(first?.viewedAt).toBeTypeOf("number");
  });

  it("adds new views to the front of the list", () => {
    addRecentlyViewed(pikachu);
    addRecentlyViewed(bulbasaur);
    const items = getRecentlyViewed();
    expect(items.map((item) => item.id)).toEqual([
      bulbasaur.id,
      pikachu.id,
    ]);
  });

  it("moves an already-viewed pokemon to the front instead of duplicating it", () => {
    addRecentlyViewed(pikachu);
    addRecentlyViewed(bulbasaur);
    addRecentlyViewed(pikachu);

    const items = getRecentlyViewed();
    expect(items).toHaveLength(2);
    expect(items.map((item) => item.id)).toEqual([
      pikachu.id,
      bulbasaur.id,
    ]);
  });

  it("refreshes viewedAt when re-viewing a pokemon", () => {
    addRecentlyViewed(pikachu);
    const [firstEntry] = getRecentlyViewed();
    const firstViewedAt = firstEntry?.viewedAt;
    expect(firstViewedAt).toBeTypeOf("number");

    addRecentlyViewed(bulbasaur);
    addRecentlyViewed(pikachu);
    const [secondEntry] = getRecentlyViewed();
    const secondViewedAt = secondEntry?.viewedAt;
    expect(secondViewedAt).toBeTypeOf("number");

    expect(secondViewedAt).toBeGreaterThanOrEqual(firstViewedAt!);
  });

  it("caps the list at MAX_RECENTLY_VIEWED, dropping the oldest entries", () => {
    for (let id = 1; id <= MAX_RECENTLY_VIEWED + 3; id += 1) {
      addRecentlyViewed({ id, name: `pokemon-${id}`, image: null });
    }

    const items = getRecentlyViewed();
    expect(items).toHaveLength(MAX_RECENTLY_VIEWED);
    // Most recently added (highest id) should be first.
    const [mostRecent] = items;
    expect(mostRecent?.id).toBe(MAX_RECENTLY_VIEWED + 3);
    // The oldest entries (ids 1-3) should have been dropped.
    expect(items.some((item) => item.id === 1)).toBe(false);
    expect(items.some((item) => item.id === 2)).toBe(false);
    expect(items.some((item) => item.id === 3)).toBe(false);
  });
});

describe("removeRecentlyViewed", () => {
  it("removes a single pokemon from the list", () => {
    addRecentlyViewed(pikachu);
    addRecentlyViewed(bulbasaur);
    addRecentlyViewed(charmander);

    removeRecentlyViewed(bulbasaur.id);

    const items = getRecentlyViewed();
    expect(items.map((item) => item.id)).toEqual([
      charmander.id,
      pikachu.id,
    ]);
  });

  it("removing an id that isn't present is a no-op", () => {
    addRecentlyViewed(pikachu);
    removeRecentlyViewed(bulbasaur.id);
    expect(getRecentlyViewed()).toHaveLength(1);
  });
});

describe("clearRecentlyViewed", () => {
  it("empties the list", () => {
    addRecentlyViewed(pikachu);
    addRecentlyViewed(bulbasaur);

    clearRecentlyViewed();

    expect(getRecentlyViewed()).toEqual([]);
    expect(recentlyViewed$.items.get()).toEqual([]);
  });
});
