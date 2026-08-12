import {
  Box,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import { getPokemon } from "~/lib/pokeapi";

interface PokemonPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function PokemonPage({
  params,
}: PokemonPageProps) {
  const { name } = await params;
  const pokemon = await getPokemon(name);

  return (
    <Box as="main" py={{ base: 10, md: 16 }}>
      <Container maxW="5xl">
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={10}
          alignItems="center"
        >
          <Box textAlign="center">
            <Image
              src={
                pokemon.sprites.front_default ??
                "/logo-icon.svg"
              }
              alt={pokemon.name}
              mx="auto"
              boxSize={{ base: "220px", md: "320px" }}
              objectFit="contain"
            />
          </Box>

          <Box>
            <Text
              fontSize="sm"
              textTransform="uppercase"
              color="gray.500"
              mb={2}
            >
              Pokémon #{pokemon.id}
            </Text>

            <Heading
              as="h1"
              size="2xl"
              textTransform="capitalize"
              mb={6}
            >
              {pokemon.name}
            </Heading>

            <SimpleGrid columns={2} gap={4}>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  Height
                </Text>
                <Text fontSize="lg" fontWeight="semibold">
                  {pokemon.height / 10} m
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.500">
                  Weight
                </Text>
                <Text fontSize="lg" fontWeight="semibold">
                  {pokemon.weight / 10} kg
                </Text>
              </Box>
            </SimpleGrid>

            <Box mt={8}>
              <Text
                fontSize="sm"
                color="gray.500"
                mb={3}
              >
                Types
              </Text>

              <Box display="flex" gap={3} flexWrap="wrap">
                {pokemon.types.map(({ slot, type }) => (
                  <Text
                    key={slot}
                    px={4}
                    py={2}
                    borderRadius="full"
                    bg="gray.100"
                    textTransform="capitalize"
                    fontWeight="medium"
                  >
                    {type.name}
                  </Text>
                ))}
              </Box>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
