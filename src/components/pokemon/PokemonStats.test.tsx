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
            base_stat: 45,
            effort: 0,
            stat: { name: "hp", url: "" },
          },
          {
            base_stat: 49,
            effort: 0,
            stat: { name: "attack", url: "" },
          },
        ]}
      />,
    );

    expect(screen.getByText(/HP/i)).toBeInTheDocument();
    expect(screen.getByText("45")).toBeInTheDocument();
  });
});
