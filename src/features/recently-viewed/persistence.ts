"use client";

import { syncObservable } from "@legendapp/state/sync";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

import { recentlyViewed$ } from "./recently-viewed.store";

export const RECENTLY_VIEWED_STORAGE_KEY =
  "pokedex-pro-recently-viewed";

syncObservable(recentlyViewed$, {
  persist: {
    name: RECENTLY_VIEWED_STORAGE_KEY,
    plugin: ObservablePersistLocalStorage,
  },
});
