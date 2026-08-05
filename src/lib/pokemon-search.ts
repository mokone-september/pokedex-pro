import Fuse from "fuse.js";

export interface PokemonListItem {
  name: string;
  url: string;
}

export function searchPokemonByName(
  pokemon: PokemonListItem[],
  query: string,
): PokemonListItem[] {
  const trimmed = query.trim();
  if (!trimmed) return pokemon;

  const fuse = new Fuse(pokemon, {
    keys: ["name"],
    threshold: 0.35,
  });

  return fuse.search(trimmed).map((result) => result.item);
}

export function sortPokemonByName<T extends { name: string }>(
  pokemon: T[],
  sort: "asc" | "desc",
): T[] {
  return [...pokemon].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return sort === "asc" ? comparison : -comparison;
  });
}

export function filterPokemonByType<T extends { types: string[] }>(
  pokemon: T[],
  type: string,
): T[] {
  if (type === "all") return pokemon;
  return pokemon.filter((item) => item.types.includes(type));
}

export function toPokemonGridItem(pokemon: {
  id: number;
  name: string;
  sprites: { front_default: string | null };
  types: { type: { name: string } }[];
}) {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.front_default ?? "",
    types: pokemon.types.map(({ type }) => type.name),
  };
}
