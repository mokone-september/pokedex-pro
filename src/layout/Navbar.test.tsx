import {
  describe,
  expect,
  it,
} from "vitest";

import {
  render,
  screen,
} from "../test-utils/render";

import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders the application title", () => {
    render(<Navbar />);

    expect(
      screen.getByText("Pokédex"),
    ).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Navbar />);

    expect(
      screen.getByRole("link", {
        name: "Home",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: "Pokémon",
      }),
    ).toBeInTheDocument();
  });

  it("renders the sign in button", () => {
    render(<Navbar />);

    expect(
      screen.getByRole("button", {
        name: "Sign In",
      }),
    ).toBeInTheDocument();
  });
});
