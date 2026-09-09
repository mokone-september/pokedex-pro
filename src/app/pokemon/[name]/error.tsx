"use client";

import { useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import ErrorState from "~/components/pokemon/ErrorState";

interface PokemonErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PokemonError({ error, reset }: PokemonErrorProps) {
  useEffect(() => {
    // Log to the console for now; swap for real error reporting later.
    console.error(error);
  }, [error]);

  return (
    <Box as="main" py={{ base: 10, md: 16 }}>
      <Container maxW="5xl">
        <ErrorState
          message="Something went wrong loading this Pokémon."
          onRetry={reset}
        />
      </Container>
    </Box>
  );
}
