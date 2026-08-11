"use client";

import {
  Box,
  HStack,
  Input,
  NativeSelect,
} from "@chakra-ui/react";

interface PokemonFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;

  type: string;
  onTypeChange: (value: string) => void;

  sort: string;
  onSortChange: (value: string) => void;
}

const pokemonTypes = [
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

const sortOptions = [
  { label: "A → Z", value: "asc" },
  { label: "Z → A", value: "desc" },
] as const;

export default function PokemonFilters({
  search,
  onSearchChange,
  type,
  onTypeChange,
  sort,
  onSortChange,
}: PokemonFiltersProps) {
  return (
    <Box mb={6}>
      <HStack
        gap={4}
        flexWrap="wrap"
        alignItems="center"
      >
        <Input
          aria-label="Search Pokémon"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          maxW="320px"
        />

        <NativeSelect.Root width="220px">
          <NativeSelect.Field
            aria-label="Filter by type"
            value={type}
            onChange={(event) =>
              onTypeChange(event.target.value)
            }
          >
            {pokemonTypes.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </NativeSelect.Field>

          <NativeSelect.Indicator />
        </NativeSelect.Root>

        <NativeSelect.Root width="180px">
          <NativeSelect.Field
            aria-label="Sort Pokémon"
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value)
            }
          >
            {sortOptions.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </NativeSelect.Field>

          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </HStack>
    </Box>
  );
}
