import { describe, expect, it } from "vitest";
import { getEvolutionStages, type EvolutionNode } from "./pokeapi";

const speciesUrl = (id: number) => `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

describe("getEvolutionStages", () => {
  it("groups branching evolutions by stage", () => {
    const chain: EvolutionNode = {
      species: { name: "eevee", url: speciesUrl(133) },
      evolves_to: [
        { species: { name: "vaporeon", url: speciesUrl(134) }, evolves_to: [] },
        { species: { name: "jolteon", url: speciesUrl(135) }, evolves_to: [] },
      ],
    };

    expect(getEvolutionStages(chain)).toEqual([
      [{ id: 133, name: "eevee" }],
      [
        { id: 134, name: "vaporeon" },
        { id: 135, name: "jolteon" },
      ],
    ]);
  });
});
