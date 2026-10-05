import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  trackPokemonFavorited,
  trackPokemonSearched,
  trackPokemonTypeFiltered,
  trackPokemonUnfavorited,
  trackPokemonViewed,
} from "./analytics";

const { capture } = vi.hoisted(() => ({
  capture: vi.fn(),
}));

vi.mock("posthog-js", () => ({
  default: { capture },
}));

beforeEach(() => {
  capture.mockClear();
});

describe("product analytics", () => {
  it("tracks search length without capturing the query", () => {
    trackPokemonSearched(7);

    expect(capture).toHaveBeenCalledWith("pokemon_searched", {
      query_length: 7,
    });
  });

  it("tracks the viewed pokemon and detail page context", () => {
    trackPokemonViewed({ id: 25, name: "pikachu" });

    expect(capture).toHaveBeenCalledWith("pokemon_viewed", {
      pokemon_id: 25,
      pokemon_name: "pikachu",
      page_context: "pokemon_detail",
    });
  });

  it("tracks favorite and unfavorite actions", () => {
    const pokemon = { id: 25, name: "pikachu" };

    trackPokemonFavorited(pokemon);
    trackPokemonUnfavorited(pokemon);

    expect(capture).toHaveBeenNthCalledWith(1, "pokemon_favorited", {
      pokemon_id: 25,
      pokemon_name: "pikachu",
    });
    expect(capture).toHaveBeenNthCalledWith(2, "pokemon_unfavorited", {
      pokemon_id: 25,
      pokemon_name: "pikachu",
    });
  });

  it("tracks the selected pokemon type", () => {
    trackPokemonTypeFiltered("fire");

    expect(capture).toHaveBeenCalledWith("pokemon_type_filtered", {
      pokemon_type: "fire",
    });
  });
});
