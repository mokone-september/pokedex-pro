import { describe, expect, it, beforeEach, vi } from "vitest";
import { screen } from "@testing-library/react";

import { customRender } from "~/test/render";

import {
  clearFavorites,
  addFavorite,
} from "~/features/favorites/favorites.store";

import PokemonCard from "./PokemonCard";

vi.mock("~/server/better-auth/client", () => ({
  authClient: { useSession: () => ({ data: null, isPending: false }) },
}));

vi.mock("~/trpc/react", () => ({
  api: {
    favorites: {
      add: { useMutation: () => ({ mutateAsync: vi.fn(), isPending: false }) },
      remove: {
        useMutation: () => ({ mutateAsync: vi.fn(), isPending: false }),
      },
    },
    useUtils: () => ({
      favorites: { list: { fetch: () => Promise.resolve([]) } },
    }),
  },
}));

const pokemon = {
  id: 25,
  name: "pikachu",
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  types: ["electric"],
};

describe("PokemonCard", () => {
  beforeEach(() => {
    clearFavorites();
  });

  it("renders pokemon name", () => {
    customRender(<PokemonCard {...pokemon} />);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  it("renders pokemon id", () => {
    customRender(
      <PokemonCard
        {...pokemon}
        image=""
      />,
    );

    expect(screen.getByText("#025")).toBeInTheDocument();
  });

  it("renders the favorite button", () => {
    customRender(<PokemonCard {...pokemon} />);

    expect(
      screen.getByRole("button", {
        name: "Add pikachu to favorites",
      }),
    ).toBeInTheDocument();
  });

  it("shows the remove favorite state for a favorited pokemon", () => {
    addFavorite({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
    });

    customRender(<PokemonCard {...pokemon} />);

    expect(
      screen.getByRole("button", {
        name: "Remove pikachu from favorites",
      }),
    ).toBeInTheDocument();
  });
});
