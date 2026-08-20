import { observable } from "@legendapp/state";

export interface FavoritePokemon {
  id: number;
  name: string;
  image: string | null;
}

export const favorites$ = observable<Record<string, FavoritePokemon>>({});

export function isFavorite(id: number): boolean {
  const key = String(id);
  const favorites = favorites$.get();
  return favorites[key] !== undefined;
}

export function addFavorite(pokemon: FavoritePokemon): void {
  const key = String(pokemon.id);
  favorites$.set({
    ...favorites$.get(),
    [key]: pokemon,
  });
}

export function removeFavorite(id: number): void {
  const key = String(id);
  const favorites = favorites$.get();
  if (!(key in favorites)) {
    return;
  }
  const remaining = Object.fromEntries(
    Object.entries(favorites).filter(
      ([favoriteId]) => favoriteId !== key,
    ),
  );
  favorites$.set(remaining);
}

/**
 * Single source of truth for toggling a favorite.
 * Delegates to addFavorite/removeFavorite so there's one
 * implementation of the add-vs-remove decision.
 */
export function toggleFavorite(pokemon: FavoritePokemon): void {
  if (isFavorite(pokemon.id)) {
    removeFavorite(pokemon.id);
    return;
  }
  addFavorite(pokemon);
}

export function getFavorites(): FavoritePokemon[] {
  return Object.values(favorites$.get());
}

export function clearFavorites(): void {
  favorites$.set({});
}
