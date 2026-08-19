"use client";

import { IconButton } from "@chakra-ui/react";
import { useValue } from "@legendapp/state/react";
import { Heart } from "lucide-react";
import { isFavorite, toggleFavorite } from "./favorites.store";

export interface FavoriteButtonProps {
  pokemon: {
    id: number;
    name: string;
    image: string | null;
  };
}

export function FavoriteButton({ pokemon }: FavoriteButtonProps) {
  const favorite = useValue(() => isFavorite(pokemon.id));

  function handleToggle(): void {
    toggleFavorite(pokemon);
  }

  return (
    <IconButton
      type="button"
      onClick={handleToggle}
      aria-label={
        favorite
          ? `Remove ${pokemon.name} from favorites`
          : `Add ${pokemon.name} to favorites`
      }
      aria-pressed={favorite}
      variant="ghost"
      size="sm"
    >
      <Heart
        fill={favorite ? "currentColor" : "none"}
        strokeWidth={favorite ? 2.5 : 2}
      />
    </IconButton>
  );
}
