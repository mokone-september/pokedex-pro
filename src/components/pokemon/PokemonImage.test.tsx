import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import PokemonImage from "./PokemonImage";

// NOTE: if this project already has a shared test render helper
// (e.g. src/test-utils/render.tsx) that wraps ChakraProvider, prefer
// importing that instead of this local one.
function renderWithChakra(ui: ReactElement) {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>);
}

describe("PokemonImage", () => {
  it("renders the image with the given src and alt text", () => {
    renderWithChakra(<PokemonImage src="/pikachu.png" alt="pikachu" />);
    const image = screen.getByAltText("pikachu");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/pikachu.png");
  });

  it("falls back to the placeholder image when the src fails to load", () => {
    renderWithChakra(<PokemonImage src="/broken-url.png" alt="pikachu" />);
    const image = screen.getByAltText("pikachu");

    // Simulate the browser failing to load the image.
    fireEvent.error(image);

    expect(image).toHaveAttribute("src", "/placeholder-pokemon.png");
  });

  it("uses the fallback image when src is null", () => {
    renderWithChakra(<PokemonImage src={null} alt="missingno" />);
    const image = screen.getByAltText("missingno");
    expect(image).toHaveAttribute("src", "/placeholder-pokemon.png");
  });

  it("uses the fallback image when src is undefined", () => {
    renderWithChakra(<PokemonImage src={undefined} alt="missingno" />);
    const image = screen.getByAltText("missingno");
    expect(image).toHaveAttribute("src", "/placeholder-pokemon.png");
  });
});
