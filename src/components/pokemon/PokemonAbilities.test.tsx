import { describe, expect, it } from "vitest";
import { render, screen } from "../../test-utils/render";
import PokemonAbilities from "./PokemonAbilities";

describe("PokemonAbilities", () => {
  it("renders regular and hidden abilities", () => {
    render(<PokemonAbilities abilities={[{ name: "overgrow", isHidden: false }, { name: "chlorophyll", isHidden: true }]} />);
    expect(screen.getByRole("heading", { name: "Abilities" })).toBeInTheDocument();
    expect(screen.getByText("overgrow")).toBeInTheDocument();
    expect(screen.getByText("chlorophyll (Hidden)")).toBeInTheDocument();
  });
});
