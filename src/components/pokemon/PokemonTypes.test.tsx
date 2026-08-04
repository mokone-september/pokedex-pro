import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { customRender } from "~/test/render";

import PokemonTypes from "./PokemonTypes";

describe("PokemonTypes", () => {
  it("renders all pokemon types", () => {
    customRender(
      <PokemonTypes
        types={["fire", "flying"]}
      />,
    );

    expect(screen.getByText(/fire/i)).toBeInTheDocument();
    expect(screen.getByText(/flying/i)).toBeInTheDocument();
  });
});
