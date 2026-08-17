import { observable } from "@legendapp/state";

export type ThemePreference = "light" | "dark" | "system";
export type SortPreference = "asc" | "desc";

export interface PreferencesState {
  theme: ThemePreference;
  sort: SortPreference;
  preferredPokemonType: string;
  showGridView: boolean;
  reduceMotion: boolean;
}

const DEFAULT_PREFERENCES: PreferencesState = {
  theme: "system",
  sort: "asc",
  preferredPokemonType: "all",
  showGridView: true,
  reduceMotion: false,
};

export const preferences$ = observable<PreferencesState>(
  DEFAULT_PREFERENCES,
);

export function setTheme(theme: ThemePreference): void {
  preferences$.theme.set(theme);
}

export function setSort(sort: SortPreference): void {
  preferences$.sort.set(sort);
}

export function setPreferredPokemonType(type: string): void {
  preferences$.preferredPokemonType.set(type);
}

export function setShowGridView(showGridView: boolean): void {
  preferences$.showGridView.set(showGridView);
}

export function setReduceMotion(reduceMotion: boolean): void {
  preferences$.reduceMotion.set(reduceMotion);
}

export function resetPreferences(): void {
  preferences$.set({ ...DEFAULT_PREFERENCES });
}

export function getPreferences(): PreferencesState {
  return preferences$.get();
}
