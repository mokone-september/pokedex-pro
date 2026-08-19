"use client";

import Link from "next/link";

import {
  Badge,
  Box,
  Card,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

import { FavoriteButton } from "~/features/favorites/FavoriteButton";

import PokemonImage from "./PokemonImage";
import PokemonTypes from "./PokemonTypes";

export interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export default function PokemonCard({
  id,
  name,
  image,
  types,
}: PokemonCardProps) {
  return (
    <Card.Root
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      transition="all 0.2s"
      position="relative"
      _hover={{
        transform: "translateY(-4px)",
        shadow: "lg",
      }}
    >
      <Box
        position="absolute"
        top={3}
        right={3}
        zIndex={1}
      >
        <FavoriteButton
          pokemon={{
            id,
            name,
            image,
          }}
        />
      </Box>

      <Link
        href={`/pokemon/${id}`}
        style={{ textDecoration: "none" }}
      >
        <Card.Body>
          <Stack align="center" gap={5}>
            <PokemonImage
              src={image}
              alt={name}
            />

            <Badge
              colorPalette="gray"
              borderRadius="full"
              px={3}
            >
              #{id.toString().padStart(3, "0")}
            </Badge>

            <Heading
              size="md"
              textTransform="capitalize"
              textAlign="center"
            >
              {name}
            </Heading>

            <PokemonTypes types={types} />

            <Text
              color="fg.muted"
              fontSize="sm"
            >
              Tap to view details
            </Text>
          </Stack>
        </Card.Body>
      </Link>
    </Card.Root>
  );
}
