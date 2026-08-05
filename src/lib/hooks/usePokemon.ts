import { useQuery } from "@tanstack/react-query";
import { getPokemonList, getPokemon } from "../pokeapi";

export function usePokemonList() {
  return useQuery({
    queryKey: ["pokemon"],
    queryFn: () => getPokemonList(),
  });
}

export function usePokemon(name: string) {
  return useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemon(name),
    enabled: !!name,
  });
}
