"use client";

import { syncObservable } from "@legendapp/state/sync";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { preferences$ } from "./preferences.store";

export const PREFERENCES_STORAGE_KEY = "pokedex-pro-preferences";

export const preferencesPersistence = syncObservable(preferences$, {
  persist: {
    name: PREFERENCES_STORAGE_KEY,
    plugin: ObservablePersistLocalStorage,
  },
});
