"use client";

import { syncObservable } from "@legendapp/state/sync";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

import { favorites$ } from "./favorites.store";

export const FAVORITES_STORAGE_KEY = "pokedex-pro-favorites";

syncObservable(favorites$, {
  persist: {
    name: FAVORITES_STORAGE_KEY,
    plugin: ObservablePersistLocalStorage,
  },
});
