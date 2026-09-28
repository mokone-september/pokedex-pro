import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import { render, screen } from "../test-utils/render";

import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders the application title", () => {
    render(<Navbar />);

    expect(screen.getByText("Pokédex")).toBeInTheDocument();
  });

  it("renders the mobile navigation menu trigger", () => {
    render(<Navbar />);

    expect(
      screen.getByRole("button", {
        name: "Open navigation menu",
      }),
    ).toBeInTheDocument();
  });

  it("opens the navigation menu", async () => {
    const user = userEvent.setup();

    render(<Navbar />);

    const menuTrigger = screen.getByRole("button", {
      name: "Open navigation menu",
    });

    await user.click(menuTrigger);

    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("renders navigation items when the menu is opened", async () => {
    const user = userEvent.setup();

    render(<Navbar />);

    await user.click(
      screen.getByRole("button", {
        name: "Open navigation menu",
      }),
    );

    expect(
      screen.getByRole("menuitem", {
        name: "Home",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("menuitem", {
        name: "Pokémon",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("menuitem", {
        name: "About",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("menuitem", {
        name: "Contact",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("menuitem", {
        name: "Sign In",
      }),
    ).toBeInTheDocument();
  });

  it("supports keyboard navigation inside the menu", async () => {
    const user = userEvent.setup();

    render(<Navbar />);

    const menuTrigger = screen.getByRole("button", {
      name: "Open navigation menu",
    });

    await user.click(menuTrigger);

    const menu = screen.getByRole("menu");

    const homeItem = screen.getByRole("menuitem", {
      name: "Home",
    });

    const pokemonItem = screen.getByRole("menuitem", {
      name: "Pokémon",
    });

    await user.keyboard("{ArrowDown}");

    expect(menu).toHaveAttribute(
      "aria-activedescendant",
      homeItem.getAttribute("id"),
    );

    await user.keyboard("{ArrowDown}");

    expect(menu).toHaveAttribute(
      "aria-activedescendant",
      pokemonItem.getAttribute("id"),
    );
  });

  it("returns focus to the menu trigger after Escape", async () => {
    const user = userEvent.setup();

    render(<Navbar />);

    const menuTrigger = screen.getByRole("button", {
      name: "Open navigation menu",
    });

    await user.click(menuTrigger);

    expect(screen.getByRole("menu")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    expect(menuTrigger).toHaveFocus();
  });

  it("renders the theme toggle", () => {
    render(<Navbar />);

    expect(
      screen.getByRole("button", {
        name: "Change theme",
      }),
    ).toBeInTheDocument();
  });
});
