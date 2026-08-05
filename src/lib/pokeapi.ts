const BASE_URL = "https://pokeapi.co/api/v2";

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}

export interface TypeResponse {
  pokemon: {
    slot: number;
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}

export async function getPokemonByType(type: string): Promise<TypeResponse> {
  const res = await fetch(
    `${BASE_URL}/type/${encodeURIComponent(type)}`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch type: ${type}`);
  }

  return res.json();
}

export const POKEMON_LIST_LIMIT = 2000;

export async function getPokemonList(
  limit = POKEMON_LIST_LIMIT,
  offset = 0,
): Promise<PokemonListResponse> {
  const res = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }

  return res.json();
}

export async function getPokemon(name: string): Promise<Pokemon> {
  const res = await fetch(
    `${BASE_URL}/pokemon/${encodeURIComponent(name)}`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch Pokémon: ${name}`);
  }

  return res.json();
}
