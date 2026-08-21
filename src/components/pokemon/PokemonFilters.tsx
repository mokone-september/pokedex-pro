"use client";

import {
  Box,
  HStack,
  Input,
  NativeSelect,
} from "@chakra-ui/react";
import { POKEMON_TYPES, type PokemonTypeValue } from "~/lib/pokemon-types";

export type SortValue = "asc" | "desc";

interface PokemonFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  type: PokemonTypeValue;
  onTypeChange: (value: PokemonTypeValue) => void;
  sort: SortValue;
  onSortChange: (value: SortValue) => void;
}

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
              onTypeChange(event.target.value as PokemonTypeValue)
            }
          >
            {POKEMON_TYPES.map((item) => (
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
              onSortChange(event.target.value as SortValue)
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
