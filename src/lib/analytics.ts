"use client";

import posthog from "posthog-js";
import type { PokemonTypeValue } from "./pokemon-types";

export function trackPokemonSearched(queryLength: number): void {
  posthog.capture("pokemon_searched", {
    query_length: queryLength,
  });
}

export function trackPokemonViewed(pokemon: {
  id: number;
  name: string;
}): void {
  posthog.capture("pokemon_viewed", {
    pokemon_id: pokemon.id,
    pokemon_name: pokemon.name,
    page_context: "pokemon_detail",
  });
}

export function trackPokemonFavorited(pokemon: {
  id: number;
  name: string;
}): void {
  posthog.capture("pokemon_favorited", {
    pokemon_id: pokemon.id,
    pokemon_name: pokemon.name,
  });
}

export function trackPokemonUnfavorited(pokemon: {
  id: number;
  name: string;
}): void {
  posthog.capture("pokemon_unfavorited", {
    pokemon_id: pokemon.id,
    pokemon_name: pokemon.name,
  });
}

export function trackPokemonTypeFiltered(
  pokemonType: PokemonTypeValue,
): void {
  posthog.capture("pokemon_type_filtered", {
    pokemon_type: pokemonType,
  });
}
