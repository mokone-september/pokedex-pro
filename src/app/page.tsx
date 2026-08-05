"use client";

import { usePokemonList } from "~/lib/hooks/usePokemon";

export default function HomePage() {
  const { data, isLoading, error } = usePokemonList();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Pokédex Pro</h1>

      <ul>
        {data?.results.map((pokemon: { name: string }) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </main>
  );
}
