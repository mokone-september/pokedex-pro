import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { customRender } from "~/test/render";

import PokemonGrid from "./PokemonGrid";

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
