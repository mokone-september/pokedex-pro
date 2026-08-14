import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen } from "../../test-utils/render";
import { render } from "../../test-utils/render";

import PokemonFilters from "./PokemonFilters";

describe("PokemonFilters", () => {
  const defaultProps = {
    search: "",
    onSearchChange: vi.fn(),

    type: "all",
    onTypeChange: vi.fn(),

    sort: "asc",
    onSortChange: vi.fn(),
  };

  it("renders the search input", () => {
    render(<PokemonFilters {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("Search Pokémon..."),
    ).toBeInTheDocument();
  });

  it("renders the type filter", () => {
    render(<PokemonFilters {...defaultProps} />);

    expect(
      screen.getByRole("combobox", {
        name: "Filter by type",
      }),
    ).toBeInTheDocument();
  });

  it("renders the sort filter", () => {
    render(<PokemonFilters {...defaultProps} />);

    expect(
      screen.getByRole("combobox", {
        name: "Sort Pokémon",
      }),
    ).toBeInTheDocument();
  });

  it("renders all pokemon type options", () => {
    render(<PokemonFilters {...defaultProps} />);

    const typeSelect = screen.getByRole("combobox", {
      name: "Filter by type",
    });

    expect(typeSelect).toHaveValue("all");

    expect(
      screen.getByRole("option", {
        name: "Fire",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Water",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Electric",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Fairy",
      }),
    ).toBeInTheDocument();
  });

  it("renders the current filter values", () => {
    render(
      <PokemonFilters
        {...defaultProps}
        search="pikachu"
        type="electric"
        sort="desc"
      />,
    );

    expect(
      screen.getByPlaceholderText("Search Pokémon..."),
    ).toHaveValue("pikachu");

    expect(
      screen.getByRole("combobox", {
        name: "Filter by type",
      }),
    ).toHaveValue("electric");

    expect(
      screen.getByRole("combobox", {
        name: "Sort Pokémon",
      }),
    ).toHaveValue("desc");
  });

  it("calls onSearchChange when searching", () => {
    const onSearchChange = vi.fn();

    render(
      <PokemonFilters
        {...defaultProps}
        onSearchChange={onSearchChange}
      />,
    );

    const input = screen.getByPlaceholderText(
      "Search Pokémon...",
    );

    fireEvent.change(input, {
      target: {
        value: "pikachu",
      },
    });

    expect(onSearchChange).toHaveBeenCalledWith(
      "pikachu",
    );
  });

  it("calls onTypeChange when changing type", () => {
    const onTypeChange = vi.fn();

    render(
      <PokemonFilters
        {...defaultProps}
        onTypeChange={onTypeChange}
      />,
    );

    const typeSelect = screen.getByRole("combobox", {
      name: "Filter by type",
    });

    fireEvent.change(typeSelect, {
      target: {
        value: "fire",
      },
    });

    expect(onTypeChange).toHaveBeenCalledWith("fire");
  });

  it("calls onSortChange when changing sort order", () => {
    const onSortChange = vi.fn();

    render(
      <PokemonFilters
        {...defaultProps}
        onSortChange={onSortChange}
      />,
    );

    const sortSelect = screen.getByRole("combobox", {
      name: "Sort Pokémon",
    });

    fireEvent.change(sortSelect, {
      target: {
        value: "desc",
      },
    });

    expect(onSortChange).toHaveBeenCalledWith("desc");
  });

  it("renders both sort options", () => {
    render(<PokemonFilters {...defaultProps} />);

    expect(
      screen.getByRole("option", {
        name: "A → Z",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Z → A",
      }),
    ).toBeInTheDocument();
  });
});
