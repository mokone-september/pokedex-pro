import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { customRender } from "~/test/render";

import PokemonGrid from "./PokemonGrid";

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

describe("PokemonGrid", () => {
  it("renders all pokemon cards", () => {
    customRender(
      <PokemonGrid
        pokemon={[
          {
            id: 1,
            name: "bulbasaur",
            image: "",
            types: ["grass"],
          },
          {
            id: 4,
            name: "charmander",
            image: "",
            types: ["fire"],
          },
        ]}
      />,
    );

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });
});
