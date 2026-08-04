import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { customRender } from "~/test/render";

import PokemonCard from "./PokemonCard";

describe("PokemonCard", () => {
  it("renders pokemon name", () => {
    customRender(
      <PokemonCard
        id={25}
        name="pikachu"
        image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
        types={["electric"]}
      />,
    );

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  it("renders pokemon id", () => {
    customRender(
      <PokemonCard
        id={25}
        name="pikachu"
        image=""
        types={["electric"]}
      />,
    );

    expect(screen.getByText("#025")).toBeInTheDocument();
  });
});
