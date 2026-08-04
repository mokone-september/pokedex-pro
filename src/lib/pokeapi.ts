const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit = 20, offset = 0) {
  const res = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon");
  }

  return res.json();
}

export async function getPokemon(name: string) {
  const res = await fetch(`${BASE_URL}/pokemon/${name}`);

  if (!res.ok) {
    throw new Error("Pokemon not found");
  }

  return res.json();
}
