import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { customRender } from "~/test/render";

import PokemonSearch from "./PokemonSearch";

describe("PokemonSearch", () => {
  it("calls onSearch", () => {
    const onSearch = vi.fn();

    customRender(
      <PokemonSearch
        value=""
        onSearch={onSearch}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: {
        value: "pikachu",
      },
    });

    expect(onSearch).toHaveBeenCalled();
  });
});
