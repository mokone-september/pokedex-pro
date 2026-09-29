import { Badge, Box, Heading, HStack } from "@chakra-ui/react";

interface PokemonAbilitiesProps {
  abilities: { name: string; isHidden: boolean }[];
}

export default function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  return (
    <Box borderWidth="1px" borderColor="border" borderRadius="xl" bg="bg.panel" p={6}>
      <Heading as="h2" size="md" mb={4}>Abilities</Heading>
      <HStack wrap="wrap" gap={3}>
        {abilities.map((ability) => (
          <Badge key={ability.name} colorPalette={ability.isHidden ? "purple" : "blue"} px={3} py={1} textTransform="capitalize">
            {ability.name.replaceAll("-", " ")}{ability.isHidden ? " (Hidden)" : ""}
          </Badge>
        ))}
      </HStack>
    </Box>
  );
}
