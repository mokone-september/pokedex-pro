import { describe, expect, it } from "vitest";

import { customRender, screen } from "~/test/render";

import Footer from "./Footer";

describe("Footer", () => {
  it("renders the footer text", () => {
    customRender(<Footer />);

    expect(
      screen.getByText(/Pokedex Pro/i),
    ).toBeInTheDocument();
  });

  it("renders the current year", () => {
    customRender(<Footer />);

    expect(
      screen.getByText(
        new RegExp(new Date().getFullYear().toString()),
      ),
    ).toBeInTheDocument();
  });
});
