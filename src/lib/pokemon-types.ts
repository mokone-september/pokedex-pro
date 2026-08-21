export const POKEMON_TYPES = [
  { label: "All Types", value: "all" },
  { label: "Normal", value: "normal" },
  { label: "Fire", value: "fire" },
  { label: "Water", value: "water" },
  { label: "Grass", value: "grass" },
  { label: "Electric", value: "electric" },
  { label: "Ice", value: "ice" },
  { label: "Fighting", value: "fighting" },
  { label: "Poison", value: "poison" },
  { label: "Ground", value: "ground" },
  { label: "Flying", value: "flying" },
  { label: "Psychic", value: "psychic" },
  { label: "Bug", value: "bug" },
  { label: "Rock", value: "rock" },
  { label: "Ghost", value: "ghost" },
  { label: "Dragon", value: "dragon" },
  { label: "Dark", value: "dark" },
  { label: "Steel", value: "steel" },
  { label: "Fairy", value: "fairy" },
] as const;

export type PokemonTypeValue = (typeof POKEMON_TYPES)[number]["value"];
