import { observable } from "@legendapp/state";

export interface RecentlyViewedPokemon {
  id: number;
  name: string;
  image: string | null;
  viewedAt: number;
}

export interface RecentlyViewedState {
  items: RecentlyViewedPokemon[];
}

export const MAX_RECENTLY_VIEWED = 12;

export const recentlyViewed$ = observable<RecentlyViewedState>({
  items: [],
});

export function addRecentlyViewed(
  pokemon: Omit<RecentlyViewedPokemon, "viewedAt">,
): void {
  const currentItems = recentlyViewed$.items.get();
  const nextItems: RecentlyViewedPokemon[] = [
    {
      ...pokemon,
      viewedAt: Date.now(),
    },
    ...currentItems.filter((item) => item.id !== pokemon.id),
  ].slice(0, MAX_RECENTLY_VIEWED);
  recentlyViewed$.items.set(nextItems);
}

/**
 * Removes a single pokemon from the recently-viewed history.
 * Used by the per-item "remove" affordance in the Recently Viewed UI.
 */
export function removeRecentlyViewed(id: number): void {
  recentlyViewed$.items.set(
    recentlyViewed$.items.get().filter((item) => item.id !== id),
  );
}

export function clearRecentlyViewed(): void {
  recentlyViewed$.items.set([]);
}

export function getRecentlyViewed(): RecentlyViewedPokemon[] {
  return recentlyViewed$.items.get();
}
