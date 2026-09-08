import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../../test-utils/render";
import ErrorState from "./ErrorState";

describe("ErrorState", () => {
  it("renders the default message", () => {
    render(<ErrorState onRetry={vi.fn()} />);
    expect(
      screen.getByText("Something went wrong loading Pokémon."),
    ).toBeInTheDocument();
  });

  it("renders a custom message when provided", () => {
    render(<ErrorState message="Custom failure" onRetry={vi.fn()} />);
    expect(screen.getByText("Custom failure")).toBeInTheDocument();
  });

  it("renders a retry button", () => {
    render(<ErrorState onRetry={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: /try again/i }),
    ).toBeInTheDocument();
  });

  it("calls onRetry when the button is clicked", async () => {
    const onRetry = vi.fn();
    const user = userEvent.setup();
    render(<ErrorState onRetry={onRetry} />);

    await user.click(screen.getByRole("button", { name: /try again/i }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
