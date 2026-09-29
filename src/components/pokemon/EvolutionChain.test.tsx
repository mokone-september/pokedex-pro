import { describe, expect, it } from "vitest";
import { render, screen } from "../../test-utils/render";
import EvolutionChain from "./EvolutionChain";

const evolutionFamily = [
  { id: 1, name: "bulbasaur" },
  { id: 2, name: "ivysaur" },
  { id: 3, name: "venusaur" },
];

describe("EvolutionChain", () => {
  it("renders every stage as a link to its detail page", () => {
    render(<EvolutionChain stages={[evolutionFamily]} />);

    expect(
      screen.getByRole("heading", { name: "Evolution chain" }),
    ).toBeInTheDocument();

    for (const stage of evolutionFamily) {
      expect(screen.getByRole("link", { name: stage.name })).toHaveAttribute(
        "href",
        `/pokemon/${stage.name}`,
      );
    }
  });

  it("explains when a Pokémon does not evolve", () => {
    render(<EvolutionChain stages={[[{ id: 1, name: "bulbasaur" }]]} />);

    expect(screen.getByText("This Pokémon does not evolve.")).toBeInTheDocument();
  });

  it("shows an isolated error message when evolution data cannot load", () => {
    render(<EvolutionChain stages={[]} hasError />);

    expect(
      screen.getByText("Evolution details are unavailable right now."),
    ).toBeInTheDocument();
  });
});
