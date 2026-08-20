"use client";

import { useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";

const FALLBACK_SRC = "/placeholder-pokemon.png";

interface PokemonImageProps {
  src: string | null | undefined;
  alt: string;
}

export default function PokemonImage({ src, alt }: PokemonImageProps) {
  const [hasError, setHasError] = useState(false);

  // Reset the error flag if a new (potentially valid) src comes in,
  // e.g. when this component is reused across different pokemon.
  useEffect(() => {
    setHasError(false);
  }, [src]);

  const resolvedSrc = !src || hasError ? FALLBACK_SRC : src;

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      onError={() => setHasError(true)}
      boxSize="120px"
      objectFit="contain"
    />
  );
}
