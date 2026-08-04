"use client";

import {
  Box,
  Heading,
  HStack,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokemonStatsProps {
  stats: PokemonStat[];
}

const statLabels: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  speed: "Speed",
};

function getColor(value: number) {
  if (value >= 120) return "green";
  if (value >= 90) return "blue";
  if (value >= 60) return "yellow";
  return "red";
}

export default function PokemonStats({
  stats,
}: PokemonStatsProps) {
  return (
    <Box
      w="full"
      borderWidth="1px"
      borderRadius="xl"
      p={6}
      bg="white"
      _dark={{
        bg: "gray.800",
        borderColor: "gray.700",
      }}
    >
      <Heading
        size="md"
        mb={6}
      >
        Base Stats
      </Heading>

      <Stack gap={5}>
        {stats.map(({ stat, base_stat }) => (
          <Box key={stat.name}>
            <HStack justify="space-between" mb={2}>
              <Text
                fontWeight="medium"
                minW="120px"
              >
                {statLabels[stat.name] ?? stat.name}
              </Text>

              <Text
                fontWeight="bold"
                color={`${getColor(base_stat)}.500`}
              >
                {base_stat}
              </Text>
            </HStack>

            <Progress.Root
              value={base_stat}
              max={255}
              size="md"
              colorPalette={getColor(base_stat)}
              borderRadius="full"
            >
              <Progress.Track borderRadius="full">
                <Progress.Range borderRadius="full" />
              </Progress.Track>
            </Progress.Root>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
