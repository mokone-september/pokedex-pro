"use client";

import { Image } from "@chakra-ui/react";

interface PokemonImageProps {
  src: string;
  alt: string;
}

export default function PokemonImage({ src, alt }: PokemonImageProps) {
  return (
    <Image
      src={src || "/placeholder-pokemon.png"}
      alt={alt}
      boxSize="120px"
      objectFit="contain"
    />
  );
}
