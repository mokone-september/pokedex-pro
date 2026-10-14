"use client";

import { Box, IconButton, Text } from "@chakra-ui/react";
import { useValue } from "@legendapp/state/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  trackPokemonFavorited,
  trackPokemonUnfavorited,
} from "~/lib/analytics";
import { authClient } from "~/server/better-auth/client";
import { api } from "~/trpc/react";
import { isFavorite, toggleFavorite } from "./favorites.store";

export interface FavoriteButtonProps {
  pokemon: {
    id: number;
    name: string;
    image: string | null;
  };
}

export function FavoriteButton({ pokemon }: FavoriteButtonProps) {
  const session = authClient.useSession();
  const userId = session.data?.user.id;
  const isAuthenticated = !!userId;
  const favoriteQueryKey = ["user-favorites", userId] as const;
  const currentUserId = useRef(userId);
  currentUserId.current = userId;
  const utils = api.useUtils();
  const queryClient = useQueryClient();
  const [mutationError, setMutationError] = useState<string | null>(null);
  const previousUserId = useRef(userId);
  useEffect(() => {
    if (previousUserId.current === userId) {
      return;
    }

    const previousId = previousUserId.current;
    previousUserId.current = userId;
    setMutationError(null);
    if (previousId) {
      const previousQueryKey = ["user-favorites", previousId] as const;
      void queryClient.cancelQueries({
        queryKey: previousQueryKey,
        exact: true,
      });
      queryClient.removeQueries({
        queryKey: previousQueryKey,
        exact: true,
      });
    }
  }, [queryClient, userId]);
  const favoritesQuery = useQuery({
    queryKey: favoriteQueryKey,
    queryFn: ({ signal }) =>
      utils.client.favorites.list.query(undefined, { signal }),
    enabled: isAuthenticated,
    staleTime: 0,
  });
  const addMutation = api.favorites.add.useMutation();
  const removeMutation = api.favorites.remove.useMutation();
  const serverFavorites = favoritesQuery.isFetching
    ? []
    : (favoritesQuery.data ?? []);
  const guestFavorite = useValue(() => isFavorite(pokemon.id));
  const favorite = isAuthenticated
    ? serverFavorites.some(({ pokemonId }) => pokemonId === pokemon.id)
    : guestFavorite;
  const mutationPending = addMutation.isPending || removeMutation.isPending;
  const disabled =
    session.isPending ||
    mutationPending ||
    (isAuthenticated && (favoritesQuery.isFetching || favoritesQuery.isError));

  async function handleToggle(): Promise<void> {
    setMutationError(null);
    try {
      if (isAuthenticated) {
        if (favorite) {
          await removeMutation.mutateAsync({ pokemonId: pokemon.id });
          if (currentUserId.current === userId) {
            queryClient.setQueryData(
              favoriteQueryKey,
              (favorites: typeof serverFavorites) =>
                favorites.filter(({ pokemonId }) => pokemonId !== pokemon.id),
            );
          }
        } else {
          await addMutation.mutateAsync({
            pokemonId: pokemon.id,
            name: pokemon.name,
            image: pokemon.image,
          });
          if (currentUserId.current === userId) {
            queryClient.setQueryData(
              favoriteQueryKey,
              (favorites: typeof serverFavorites) => [
                ...favorites.filter(({ pokemonId }) => pokemonId !== pokemon.id),
                {
                  pokemonId: pokemon.id,
                  name: pokemon.name,
                  image: pokemon.image,
                },
              ],
            );
          }
        }
      } else {
        toggleFavorite(pokemon);
      }

      if (favorite) {
        trackPokemonUnfavorited(pokemon);
      } else {
        trackPokemonFavorited(pokemon);
      }
    } catch {
      if (currentUserId.current === userId) {
        setMutationError("Unable to update favorites. Please try again.");
      }
    }
  }

  return (
    <Box>
      <IconButton
        type="button"
        onClick={() => void handleToggle()}
        aria-label={
          favorite
            ? `Remove ${pokemon.name} from favorites`
            : `Add ${pokemon.name} to favorites`
        }
        aria-pressed={favorite}
        aria-busy={disabled}
        disabled={disabled}
        variant="ghost"
        size="sm"
      >
        <Heart
          fill={favorite ? "currentColor" : "none"}
          strokeWidth={favorite ? 2.5 : 2}
        />
      </IconButton>
      {(mutationError !== null ||
        (isAuthenticated && favoritesQuery.isError)) && (
        <Text role="alert" color="red.600" fontSize="sm">
          {mutationError ?? "Unable to load favorites."}
        </Text>
      )}
    </Box>
  );
}
