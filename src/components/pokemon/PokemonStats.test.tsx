import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { customRender } from "~/test/render";

import PokemonStats from "./PokemonStats";

describe("PokemonStats", () => {
  it("renders stats", () => {
    customRender(
      <PokemonStats
        stats={[
          {
            name: "HP",
            value: 45,
          },
          {
            name: "Attack",
            value: 49,
          },
        ]}
      />,
    );

    expect(screen.getByText(/HP/i)).toBeInTheDocument();
    expect(screen.getByText("45")).toBeInTheDocument();
  });
});
