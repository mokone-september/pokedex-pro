import { describe, expect, it } from "vitest";
import { customRender } from "~/test/render";

import PokemonSkeleton from "./PokemonSkeleton";

describe("PokemonSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = customRender(<PokemonSkeleton />);

    expect(container).toBeTruthy();
  });
});
