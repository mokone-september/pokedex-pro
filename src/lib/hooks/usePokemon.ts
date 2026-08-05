import { useQueries, useQuery } from "@tanstack/react-query";
import { getPokemon, getPokemonByType, getPokemonList } from "../pokeapi";

export function usePokemonList() {
  return useQuery({
    queryKey: ["pokemon"],
    queryFn: () => getPokemonList(),
  });
}

export function usePokemonByType(type: string) {
  return useQuery({
    queryKey: ["pokemon", "type", type],
    queryFn: () => getPokemonByType(type),
    enabled: type !== "all",
  });
}

export function usePokemon(name: string) {
  return useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemon(name),
    enabled: !!name,
  });
}

export function usePokemonDetails(names: string[]) {
  return useQueries({
    queries: names.map((name) => ({
      queryKey: ["pokemon", name],
      queryFn: () => getPokemon(name),
      enabled: !!name,
      staleTime: 1000 * 60 * 30,
    })),
  });
}
