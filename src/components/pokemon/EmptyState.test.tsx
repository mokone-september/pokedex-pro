import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../../test-utils/render";
import EmptyState from "./EmptyState";

describe("EmptyState", () => {
  it("renders a helpful default title and message", () => {
    render(<EmptyState />);

    expect(
      screen.getByRole("heading", { name: "No Pokémon found" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Try adjusting your search or filters to find a Pokémon.",
      ),
    ).toBeInTheDocument();
  });

  it("renders a custom message when provided", () => {
    render(<EmptyState title="Nothing here" message="Try another search" />);

    expect(
      screen.getByRole("heading", { name: "Nothing here" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Try another search")).toBeInTheDocument();
  });

  it("does not render an action button when none is provided", () => {
    render(<EmptyState />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders and triggers the action button when provided", async () => {
    const onAction = vi.fn();
    const user = userEvent.setup();
    render(<EmptyState actionLabel="Clear filters" onAction={onAction} />);

    const button = screen.getByRole("button", { name: "Clear filters" });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
