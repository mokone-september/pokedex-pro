import { beforeEach, describe, expect, it } from "vitest";
import {
  getPreferences,
  preferences$,
  resetPreferences,
  setPreferredPokemonType,
  setReduceMotion,
  setShowGridView,
  setSort,
  setTheme,
} from "./preferences.store";

const DEFAULTS = {
  theme: "system",
  sort: "asc",
  preferredPokemonType: "all",
  showGridView: true,
  reduceMotion: false,
} as const;

beforeEach(() => {
  resetPreferences();
});

describe("defaults", () => {
  it("starts with the documented default preferences", () => {
    expect(getPreferences()).toEqual(DEFAULTS);
  });
});

describe("setTheme", () => {
  it("updates only the theme field", () => {
    setTheme("dark");
    expect(getPreferences()).toEqual({ ...DEFAULTS, theme: "dark" });
  });
});

describe("setSort", () => {
  it("updates only the sort field", () => {
    setSort("desc");
    expect(getPreferences()).toEqual({ ...DEFAULTS, sort: "desc" });
  });
});

describe("setPreferredPokemonType", () => {
  it("updates only the preferredPokemonType field", () => {
    setPreferredPokemonType("fire");
    expect(getPreferences()).toEqual({
      ...DEFAULTS,
      preferredPokemonType: "fire",
    });
  });
});

describe("setShowGridView", () => {
  it("updates only the showGridView field", () => {
    setShowGridView(false);
    expect(getPreferences()).toEqual({ ...DEFAULTS, showGridView: false });
  });
});

describe("setReduceMotion", () => {
  it("updates only the reduceMotion field", () => {
    setReduceMotion(true);
    expect(getPreferences()).toEqual({ ...DEFAULTS, reduceMotion: true });
  });
});

describe("resetPreferences", () => {
  it("restores every field to its default, even after multiple changes", () => {
    setTheme("dark");
    setSort("desc");
    setPreferredPokemonType("water");
    setShowGridView(false);
    setReduceMotion(true);

    resetPreferences();

    expect(getPreferences()).toEqual(DEFAULTS);
  });

  it("does not mutate the original default preferences object on reset", () => {
    setTheme("dark");
    resetPreferences();
    setTheme("light");

    // A second reset should still land on the true defaults, proving
    // resetPreferences() doesn't accidentally share/mutate state
    // between calls.
    resetPreferences();
    expect(preferences$.theme.get()).toBe("system");
  });
});

describe("independent field updates", () => {
  it("changing one field does not affect the others", () => {
    setTheme("dark");
    setSort("desc");

    expect(getPreferences()).toEqual({
      ...DEFAULTS,
      theme: "dark",
      sort: "desc",
    });
  });
});
