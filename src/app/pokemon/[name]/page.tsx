import {
  Box,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { getPokemon } from "~/lib/pokeapi";
import { RecordRecentlyViewed } from "~/features/recently-viewed/RecordRecentlyViewed";
import EvolutionChainSection, {
  EvolutionChainSkeleton,
} from "~/components/pokemon/EvolutionChainSection";
import PokemonAbilities from "~/components/pokemon/PokemonAbilities";
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
  const spriteSrc = pokemon.sprites.front_default ?? "/logo-icon.svg";
  return (
    <Box as="main" py={{ base: 10, md: 16 }}>
      <RecordRecentlyViewed
        pokemon={{
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default ?? null,
        }}
      />
      <Container maxW="5xl">
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={10}
          alignItems="center"
        >
          <Box textAlign="center">
            <Image
              src={spriteSrc}
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
              color="fg.muted"
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
                <Text fontSize="sm" color="fg.muted">
                  Height
                </Text>
                <Text fontSize="lg" fontWeight="semibold">
                  {pokemon.height / 10} m
                </Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="fg.muted">
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
                color="fg.muted"
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
                    bg="bg.muted"
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
        <Box mt={10}>
          <PokemonAbilities
            abilities={pokemon.abilities.map(({ ability, is_hidden }) => ({
              name: ability.name,
              isHidden: is_hidden,
            }))}
          />
        </Box>
        <Box mt={10}>
          <Suspense fallback={<EvolutionChainSkeleton />}>
            <EvolutionChainSection name={pokemon.name} />
          </Suspense>
        </Box>
      </Container>
    </Box>
  );
}
import { Suspense } from "react";
