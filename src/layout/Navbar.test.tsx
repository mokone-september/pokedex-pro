import { describe, expect, it } from "vitest";

import { customRender, screen } from "~/test/render";

import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders the application title", () => {
    customRender(<Navbar />);

    expect(
      screen.getByRole("heading", {
        name: /Pokedex Pro/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    customRender(<Navbar />);

    expect(
      screen.getByRole("link", {
        name: /Home/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /Pokemon/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /About/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /Contact/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the sign in button", () => {
    customRender(<Navbar />);

    expect(
      screen.getByRole("button", {
        name: /Sign In/i,
      }),
    ).toBeInTheDocument();
  });
});
