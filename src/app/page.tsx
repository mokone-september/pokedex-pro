"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useValue } from "@legendapp/state/react";
import PokemonFilters from "~/components/pokemon/PokemonFilters";
import PokemonGrid from "~/components/pokemon/PokemonGrid";
import PokemonSkeleton from "~/components/pokemon/PokemonSkeleton";
import ErrorState from "~/components/pokemon/ErrorState";
import EmptyState from "~/components/pokemon/EmptyState";
import Container from "~/layout/Container";
import { RecentlyViewedList } from "~/features/recently-viewed/RecentlyViewedList";
import {
  preferences$,
  setPreferredPokemonType,
  setSort,
} from "~/features/preferences/preferences.store";
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

  const type = useValue(() => preferences$.preferredPokemonType.get());
  const sort = useValue(() => preferences$.sort.get());

  const {
    data: pokemonList,
    isLoading: isListLoading,
    error: listError,
    refetch: refetchList,
  } = usePokemonList();
  const {
    data: typeData,
    isLoading: isTypeLoading,
    error: typeError,
    refetch: refetchType,
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
    return sortPokemonByName(searched, sort).slice(0, DISPLAY_LIMIT);
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
  const detailsFailed = detailQueries.some((query) => query.isError);

  const hasActiveFilters =
    search.trim() !== "" || type !== "all" || sort !== "asc";

  function handleRetry(): void {
    void refetchList();
    if (type !== "all") {
      void refetchType();
    }
    detailQueries.forEach((query) => {
      if (query.isError) {
        void query.refetch();
      }
    });
  }

  function handleClearFilters(): void {
    setSearch("");
    setPreferredPokemonType("all");
    setSort("asc");
  }

  return (
    <Box as="main" py={8}>
      <Container>
        <Heading as="h1" size="2xl" mb={2}>
          Pokédex Pro
        </Heading>
        <Text color="fg.muted" mb={8}>
          Search Pokémon by name, filter by type, and explore the full
          Pokédex.
        </Text>

        <RecentlyViewedList />

        <PokemonFilters
          search={search}
          onSearchChange={setSearch}
          type={type}
          onTypeChange={setPreferredPokemonType}
          sort={sort}
          onSortChange={setSort}
        />

        {/* aria-live announces loading/error/empty/result-count changes
            to screen reader users without requiring them to navigate
            to this region manually. */}
        <Box aria-live="polite" aria-atomic="true">
          {error || detailsFailed ? (
            <ErrorState onRetry={handleRetry} />
          ) : isLoading ? (
            <>
              <VisuallyHidden>Loading Pokémon…</VisuallyHidden>
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
            </>
          ) : pokemon.length === 0 ? (
            <EmptyState
              title={
                hasActiveFilters ? "No matching Pokémon" : "No Pokémon found"
              }
              message={
                hasActiveFilters
                  ? "Try a different search or clear your filters to see all Pokémon."
                  : "The Pokédex could not find any Pokémon right now."
              }
              actionLabel={hasActiveFilters ? "Clear filters" : undefined}
              onAction={hasActiveFilters ? handleClearFilters : undefined}
            />
          ) : (
            <>
              <VisuallyHidden>
                {pokemon.length} Pokémon found.
              </VisuallyHidden>
              <PokemonGrid pokemon={pokemon} />
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}
