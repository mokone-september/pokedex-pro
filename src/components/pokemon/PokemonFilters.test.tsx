import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { customRender } from "~/test/render";

import PokemonFilters from "./PokemonFilters";

describe("PokemonFilters", () => {
  it("renders filters", () => {
    customRender(
      <PokemonFilters
        type=""
        sort="asc"
        onTypeChange={() => {}}
        onSortChange={() => {}}
      />,
    );

    expect(screen.getByText(/Type/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort/i)).toBeInTheDocument();
  });
});
