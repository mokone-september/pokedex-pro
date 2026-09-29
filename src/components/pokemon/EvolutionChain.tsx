import Link from "next/link";
import {
  Box,
  Heading,
  HStack,
  Image,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import type { EvolutionPokemon } from "~/lib/pokeapi";

interface EvolutionChainProps {
  stages: EvolutionPokemon[][];
  hasError?: boolean;
}

function EvolutionContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box borderWidth="1px" borderColor="border" borderRadius="xl" bg="bg.panel" p={6}>
      <Heading as="h2" size="md" mb={4}>
        Evolution chain
      </Heading>
      {children}
    </Box>
  );
}

export default function EvolutionChain({ stages, hasError = false }: EvolutionChainProps) {
  if (hasError) {
    return (
      <EvolutionContainer>
        <Text color="fg.muted">Evolution details are unavailable right now.</Text>
      </EvolutionContainer>
    );
  }

  if (stages.flat().length <= 1) {
    return (
      <EvolutionContainer>
        <Text color="fg.muted">This Pokémon does not evolve.</Text>
      </EvolutionContainer>
    );
  }

  return (
    <EvolutionContainer>
      <HStack gap={3} wrap="wrap" align="center">
        {stages.map((stageGroup, groupIndex) => (
          <HStack key={groupIndex} gap={3} align="center" wrap="wrap">
            {groupIndex > 0 && <ArrowRight aria-hidden="true" size={20} />}
            {stageGroup.map((stage) => (
              <ChakraLink key={stage.id} asChild _hover={{ textDecoration: "none" }}>
                <Link href={`/pokemon/${stage.name}`}>
                  <Box
                    borderWidth="1px"
                    borderColor="border"
                    borderRadius="lg"
                    p={3}
                    minW="112px"
                    textAlign="center"
                    _hover={{ borderColor: "blue.500", bg: "bg.muted" }}
                  >
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${stage.id}.png`}
                      alt=""
                      boxSize="72px"
                      mx="auto"
                      objectFit="contain"
                    />
                    <Text mt={2} fontWeight="medium" textTransform="capitalize">
                      {stage.name}
                    </Text>
                  </Box>
                </Link>
              </ChakraLink>
            ))}
          </HStack>
        ))}
      </HStack>
    </EvolutionContainer>
  );
}
