"use client";

import {
  Box,
  HStack,
  Input,
  Select,
  createListCollection,
} from "@chakra-ui/react";

interface PokemonFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;

  type: string;
  onTypeChange: (value: string) => void;

  sort: string;
  onSortChange: (value: string) => void;
}

const typeCollection = createListCollection({
  items: [
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
  ],
});

const sortCollection = createListCollection({
  items: [
    { label: "A → Z", value: "asc" },
    { label: "Z → A", value: "desc" },
  ],
});

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
      <HStack gap={4} flexWrap="wrap">
        <Input
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          maxW="320px"
        />

        <Select.Root
          collection={typeCollection}
          value={[type]}
          onValueChange={(details) =>
            onTypeChange(details.value[0] ?? "all")
          }
          width="220px"
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Type" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>

          <Select.Positioner>
            <Select.Content>
              {typeCollection.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>

        <Select.Root
          collection={sortCollection}
          value={[sort]}
          onValueChange={(details) =>
            onSortChange(details.value[0] ?? "asc")
          }
          width="180px"
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Sort" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>

          <Select.Positioner>
            <Select.Content>
              {sortCollection.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </HStack>
    </Box>
  );
}
