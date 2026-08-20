"use client";

import Link from "next/link";
import { useValue } from "@legendapp/state/react";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { X } from "lucide-react";
import PokemonImage from "~/components/pokemon/PokemonImage";
import {
  clearRecentlyViewed,
  getRecentlyViewed,
  removeRecentlyViewed,
} from "./recently-viewed.store";

export function RecentlyViewedList() {
  const items = useValue(() => getRecentlyViewed());

  if (items.length === 0) {
    return null;
  }

  return (
    <Box as="section" mb={{ base: 8, md: 12 }}>
      <HStack justify="space-between" mb={4}>
        <Heading size="md">Recently Viewed</Heading>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={clearRecentlyViewed}
        >
          Clear all
        </Button>
      </HStack>

      <HStack gap={4} overflowX="auto" pb={2}>
        {items.map((item) => (
          <Box
            key={item.id}
            position="relative"
            flexShrink={0}
            borderWidth="1px"
            borderRadius="xl"
            p={3}
            minW="120px"
          >
            <IconButton
              type="button"
              aria-label={`Remove ${item.name} from recently viewed`}
              onClick={() => removeRecentlyViewed(item.id)}
              position="absolute"
              top={1}
              right={1}
              size="2xs"
              variant="ghost"
            >
              <X size={14} />
            </IconButton>

            <Link href={`/pokemon/${item.name}`}>
              <Stack align="center" gap={2}>
                <PokemonImage src={item.image} alt={item.name} />
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  textTransform="capitalize"
                  textAlign="center"
                >
                  {item.name}
                </Text>
              </Stack>
            </Link>
          </Box>
        ))}
      </HStack>
    </Box>
  );
}
