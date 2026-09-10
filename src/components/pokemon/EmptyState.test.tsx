import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../../test-utils/render";
import EmptyState from "./EmptyState";

describe("EmptyState", () => {
  it("renders the default message", () => {
    render(<EmptyState />);
    expect(
      screen.getByText("No Pokémon match your search."),
    ).toBeInTheDocument();
  });

  it("renders a custom message when provided", () => {
    render(<EmptyState message="Nothing here" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
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
