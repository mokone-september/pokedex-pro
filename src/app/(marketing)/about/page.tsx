import { Box, Container, Heading, Text } from "@chakra-ui/react";

export default function AboutPage() {
  return (
    <Box as="main" py={{ base: 12, md: 20 }}>
      <Container maxW="4xl">
        <Heading as="h1" size="2xl" mb={6}>
          About Pokédex Pro
        </Heading>

        <Text fontSize="lg" color="gray.600">
          Pokédex Pro is a modern Pokémon browsing application built
          with Next.js, TypeScript, Chakra UI, and PokéAPI.
        </Text>
      </Container>
    </Box>
  );
}
