import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { customRender } from "~/test/render";

import PokemonImage from "./PokemonImage";

describe("PokemonImage", () => {
  it("renders image", () => {
    customRender(
      <PokemonImage
        src="/pikachu.png"
        alt="Pikachu"
      />,
    );

    expect(screen.getByAltText("Pikachu")).toBeInTheDocument();
  });
});
