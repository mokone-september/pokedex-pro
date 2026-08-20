import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { FavoriteButton } from "./FavoriteButton";
import { addFavorite, clearFavorites, isFavorite } from "./favorites.store";

// NOTE: if this project already has a shared test render helper
// (e.g. src/test-utils/render.tsx) that wraps ChakraProvider, prefer
// importing that instead of this local one, so all tests stay
// consistent with your actual theme/system config.
function renderWithChakra(ui: ReactElement) {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>);
}

const pikachu = { id: 25, name: "pikachu", image: "/pikachu.png" };

beforeEach(() => {
  clearFavorites();
});

describe("FavoriteButton", () => {
  it("renders the add favorite state when not favorited", () => {
    renderWithChakra(<FavoriteButton pokemon={pikachu} />);
    const button = screen.getByRole("button", {
      name: "Add pikachu to favorites",
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("renders the remove favorite state when already favorited", () => {
    addFavorite(pikachu);

    renderWithChakra(<FavoriteButton pokemon={pikachu} />);
    const button = screen.getByRole("button", {
      name: "Remove pikachu from favorites",
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("adds the pokemon to favorites when clicked from the unfavorited state", async () => {
    const user = userEvent.setup();
    renderWithChakra(<FavoriteButton pokemon={pikachu} />);

    await user.click(
      screen.getByRole("button", { name: "Add pikachu to favorites" }),
    );

    expect(isFavorite(pikachu.id)).toBe(true);
    expect(
      screen.getByRole("button", { name: "Remove pikachu from favorites" }),
    ).toBeInTheDocument();
  });

  it("removes the pokemon from favorites when clicked from the favorited state", async () => {
    addFavorite(pikachu);
    const user = userEvent.setup();

    renderWithChakra(<FavoriteButton pokemon={pikachu} />);

    await user.click(
      screen.getByRole("button", { name: "Remove pikachu from favorites" }),
    );

    expect(isFavorite(pikachu.id)).toBe(false);
    expect(
      screen.getByRole("button", { name: "Add pikachu to favorites" }),
    ).toBeInTheDocument();
  });
});
