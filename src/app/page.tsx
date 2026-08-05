"use client";

import { useMemo, useState } from "react";

import {
  Box,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import PokemonFilters from "~/components/pokemon/PokemonFilters";
import PokemonGrid from "~/components/pokemon/PokemonGrid";
import PokemonSkeleton from "~/components/pokemon/PokemonSkeleton";
import Container from "~/layout/Container";
import Navbar from "~/layout/Navbar";
import {
  usePokemonByType,
  usePokemonDetails,
  usePokemonList,
} from "~/lib/hooks/usePokemon";
import {
  searchPokemonByName,
  sortPokemonByName,
  toPokemonGridItem,
} from "~/lib/pokemon-search";

const DISPLAY_LIMIT = 24;

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("asc");

  const {
    data: pokemonList,
    isLoading: isListLoading,
    error: listError,
  } = usePokemonList();

  const {
    data: typeData,
    isLoading: isTypeLoading,
    error: typeError,
  } = usePokemonByType(type);

  const sourceList = useMemo(() => {
    if (type === "all") {
      return pokemonList?.results ?? [];
    }

    return (
      typeData?.pokemon.map(({ pokemon }) => ({
        name: pokemon.name,
        url: pokemon.url,
      })) ?? []
    );
  }, [pokemonList?.results, type, typeData?.pokemon]);

  const filteredNames = useMemo(() => {
    const searched = searchPokemonByName(sourceList, search);
    return sortPokemonByName(searched, sort as "asc" | "desc").slice(
      0,
      DISPLAY_LIMIT,
    );
  }, [search, sort, sourceList]);

  const detailQueries = usePokemonDetails(
    filteredNames.map((pokemon) => pokemon.name),
  );

  const pokemon = useMemo(
    () =>
      detailQueries
        .map((query) => query.data)
        .filter((data): data is NonNullable<typeof data> => !!data)
        .map(toPokemonGridItem),
    [detailQueries],
  );

  const isLoading =
    isListLoading ||
    (type !== "all" && isTypeLoading) ||
    detailQueries.some((query) => query.isLoading);

  const error = listError ?? typeError;

  return (
    <>
      <Navbar />

      <Box as="main" py={8}>
        <Container>
          <Heading size="2xl" mb={2}>
            Pokédex Pro
          </Heading>

          <Text color="fg.muted" mb={8}>
            Search Pokémon by name, filter by type, and explore the full
            Pokédex.
          </Text>

          <PokemonFilters
            search={search}
            onSearchChange={setSearch}
            type={type}
            onTypeChange={setType}
            sort={sort}
            onSortChange={setSort}
          />

          {error ? (
            <Text color="red.500">Something went wrong loading Pokémon.</Text>
          ) : isLoading ? (
            <SimpleGrid
              columns={{
                base: 1,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 5,
              }}
              gap={6}
              w="full"
            >
              <PokemonSkeleton count={8} />
            </SimpleGrid>
          ) : pokemon.length === 0 ? (
            <Text color="fg.muted">No Pokémon match your search.</Text>
          ) : (
            <PokemonGrid pokemon={pokemon} />
          )}
        </Container>
      </Box>
    </>
  );
}
