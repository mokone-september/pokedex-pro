"use client";

import { SimpleGrid } from "@chakra-ui/react";

import PokemonCard from "./PokemonCard";

export interface PokemonGridItem {
  id: number;
  name: string;
  image: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
}

interface PokemonGridProps {
  pokemon: PokemonGridItem[];
}

export default function PokemonGrid({
  pokemon,
}: PokemonGridProps) {
  return (
    <SimpleGrid
      columns={{
        base: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      }}
      gap={6}
      w="full"
    >
      {pokemon.map((item) => (
        <PokemonCard
          key={item.id}
          id={item.id}
          name={item.name}
          image={item.image}
          types={item.types}
        />
      ))}
    </SimpleGrid>
  );
}
