"use client";

import {
  Box,
  Card,
  HStack,
  Skeleton,
  SkeletonCircle,
  Stack,
} from "@chakra-ui/react";

interface PokemonSkeletonProps {
  count?: number;
}

export default function PokemonSkeleton({
  count = 10,
}: PokemonSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card.Root
          key={index}
          borderRadius="2xl"
          overflow="hidden"
          borderWidth="1px"
          bg="white"
          _dark={{
            bg: "gray.800",
            borderColor: "gray.700",
          }}
        >
          <Card.Body p={6}>
            <Stack align="center" gap={5}>
              {/* Pokémon Image */}
              <SkeletonCircle size="40" />

              {/* Pokédex Number */}
              <Skeleton
                height="22px"
                width="70px"
                borderRadius="full"
              />

              {/* Pokémon Name */}
              <Skeleton
                height="28px"
                width="140px"
              />

              {/* Type Badges */}
              <HStack gap={2}>
                <Skeleton
                  height="24px"
                  width="70px"
                  borderRadius="full"
                />
                <Skeleton
                  height="24px"
                  width="70px"
                  borderRadius="full"
                />
              </HStack>

              {/* Divider */}
              <Box
                w="full"
                pt={4}
              >
                <Skeleton
                  height="18px"
                  width="100%"
                />
              </Box>
            </Stack>
          </Card.Body>
        </Card.Root>
      ))}
    </>
  );
}
