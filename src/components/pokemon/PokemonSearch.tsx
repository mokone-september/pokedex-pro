"use client";

import { Input } from "@chakra-ui/react";

interface PokemonSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PokemonSearch({
  value,
  onChange,
}: PokemonSearchProps) {
  return (
    <Input
      placeholder="Search Pokémon..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="lg"
      borderRadius="xl"
      bg="white"
      _dark={{ bg: "gray.800" }}
      focusRing="outside"
      maxW="400px"
    />
  );
}
