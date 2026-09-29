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
  abilities: {
    is_hidden: boolean;
    ability: { name: string };
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

export interface PokemonSpecies {
  evolution_chain: {
    url: string;
  } | null;
}

export interface EvolutionChainResponse {
  chain: EvolutionNode;
}

export interface EvolutionNode {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionNode[];
}

export interface EvolutionPokemon {
  id: number;
  name: string;
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

function getPokemonIdFromSpeciesUrl(url: string): number {
  const match = /\/pokemon-species\/(\d+)\/?$/.exec(url);

  if (!match) {
    throw new Error("Could not determine Pokémon ID from species URL.");
  }

  return Number(match[1]);
}

export function getEvolutionStages(
  node: EvolutionNode,
): EvolutionPokemon[][] {
  const stages: EvolutionPokemon[][] = [];

  function addNode(currentNode: EvolutionNode, depth: number): void {
    stages[depth] ??= [];
    stages[depth].push({
      id: getPokemonIdFromSpeciesUrl(currentNode.species.url),
      name: currentNode.species.name,
    });
    currentNode.evolves_to.forEach((nextNode) => addNode(nextNode, depth + 1));
  }

  addNode(node, 0);
  return stages;
}

export async function getPokemonEvolutionChain(
  name: string,
): Promise<EvolutionPokemon[][]> {
  const species = await fetchJson<PokemonSpecies>(
    `${BASE_URL}/pokemon-species/${encodeURIComponent(name)}`,
  );

  if (!species.evolution_chain) {
    return [];
  }

  const evolutionChain = await fetchJson<EvolutionChainResponse>(
    species.evolution_chain.url,
  );

  return getEvolutionStages(evolutionChain.chain);
}
