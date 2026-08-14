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

async function fetchJson<T>(
  url: string,
): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Request failed: ${res.status} ${res.statusText}`,
    );
  }

  return (await res.json()) as T;
}

export async function getPokemonByType(
  type: string,
): Promise<TypeResponse> {
  return fetchJson<TypeResponse>(
    `${BASE_URL}/type/${encodeURIComponent(type)}`,
  );
}

export const POKEMON_LIST_LIMIT = 2000;

export async function getPokemonList(
  limit = POKEMON_LIST_LIMIT,
  offset = 0,
): Promise<PokemonListResponse> {
  return fetchJson<PokemonListResponse>(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );
}

export async function getPokemon(
  name: string,
): Promise<Pokemon> {
  return fetchJson<Pokemon>(
    `${BASE_URL}/pokemon/${encodeURIComponent(name)}`,
  );
}
