import { describe, expect, it } from "vitest";

import {
  filterPokemonByType,
  searchPokemonByName,
  sortPokemonByName,
} from "./pokemon-search";

const samplePokemon = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
  { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
];

describe("pokemon-search", () => {
  it("searches pokemon by name", () => {
    const results = searchPokemonByName(samplePokemon, "pika");

    expect(results).toHaveLength(1);
    expect(results[0]?.name).toBe("pikachu");
  });

  it("returns all pokemon when search is empty", () => {
    expect(searchPokemonByName(samplePokemon, "")).toEqual(samplePokemon);
  });

  it("sorts pokemon by name", () => {
    const sorted = sortPokemonByName(samplePokemon, "desc");

    expect(sorted.map((pokemon) => pokemon.name)).toEqual([
      "pikachu",
      "charmander",
      "bulbasaur",
    ]);
  });

  it("filters pokemon by type", () => {
    const pokemon = [
      { name: "bulbasaur", types: ["grass", "poison"] },
      { name: "charmander", types: ["fire"] },
    ];

    expect(filterPokemonByType(pokemon, "fire")).toEqual([
      { name: "charmander", types: ["fire"] },
    ]);
  });
});
