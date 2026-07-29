import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Box
      minH="100vh"
      bg="gray.950"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={6}
    >
      <Stack
        maxW="700px"
        textAlign="center"
        gap={6}
      >
        <Badge
          alignSelf="center"
          colorPalette="purple"
          px={4}
          py={2}
          rounded="full"
        >
          🚧 Coming Soon
        </Badge>

        <Heading
          size="2xl"
          lineHeight="short"
        >
          Pokédex Pro
        </Heading>

        <Text fontSize="xl" color="gray.400">
          The ultimate Pokémon explorer built with Next.js, tRPC,
          Prisma, Better Auth and the PokéAPI.
        </Text>

        <Text color="gray.500">
          Search Pokémon, build teams, discover evolutions,
          compare stats, and much more.
        </Text>

        <HStack justify="center" mt={4}>
          <Button
            colorPalette="purple"
            size="lg"
          >
            Coming Soon
          </Button>

          <Button
            variant="outline"
            size="lg"
          >
            GitHub
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
}
