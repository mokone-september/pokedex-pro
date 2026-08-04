"use client";

import { Badge, HStack } from "@chakra-ui/react";

interface PokemonTypesProps {
  types: string[];
}

const colors: Record<string, string> = {
  normal: "gray",
  fire: "red",
  water: "blue",
  electric: "yellow",
  grass: "green",
  ice: "cyan",
  fighting: "orange",
  poison: "purple",
  ground: "yellow",
  flying: "teal",
  psychic: "pink",
  bug: "green",
  rock: "gray",
  ghost: "purple",
  dragon: "purple",
  dark: "gray",
  steel: "gray",
  fairy: "pink",
};

export default function PokemonTypes({
  types,
}: PokemonTypesProps) {
  return (
    <HStack wrap="wrap" justify="center">
      {types.map((type) => (
        <Badge
          key={type}
          colorPalette={colors[type] ?? "gray"}
          textTransform="capitalize"
        >
          {type}
        </Badge>
      ))}
    </HStack>
  );
}
