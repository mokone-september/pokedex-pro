import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { customRender } from "~/test/render";

import PokemonFilters from "./PokemonFilters";

describe("PokemonFilters", () => {
  it("renders filters", () => {
    customRender(
      <PokemonFilters
        search=""
        onSearchChange={() => {}}
        type="all"
        sort="asc"
        onTypeChange={() => {}}
        onSortChange={() => {}}
      />,
    );

    expect(screen.getByPlaceholderText(/search pokémon/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /all types/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /a → z/i })).toBeInTheDocument();
  });
});
