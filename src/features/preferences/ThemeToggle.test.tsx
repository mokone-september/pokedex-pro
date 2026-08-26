import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../test-utils/render";

const mockSetTheme = vi.fn();
let mockTheme = "system";
const mockResolvedTheme = "light";

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: mockTheme,
    resolvedTheme: mockResolvedTheme,
    setTheme: mockSetTheme,
  }),
}));

vi.mock("./preferences.store", () => ({
  setTheme: vi.fn(),
}));

import { ThemeToggle } from "./ThemeToggle";
import { setTheme as setPreferredTheme } from "./preferences.store";

beforeEach(() => {
  mockTheme = "system";
  mockSetTheme.mockClear();
  vi.mocked(setPreferredTheme).mockClear();
});

describe("ThemeToggle", () => {
  it("renders a trigger button", () => {
    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: "Change theme" }),
    ).toBeInTheDocument();
  });

  it("opens a menu with all three theme options", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: "Change theme" }));

    expect(screen.getByText("Light")).toBeInTheDocument();
    expect(screen.getByText("Dark")).toBeInTheDocument();
    expect(screen.getByText("System")).toBeInTheDocument();
  });

  it("calls next-themes' setTheme and mirrors the choice into the preferences store when Dark is selected", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: "Change theme" }));
    await user.click(screen.getByText("Dark"));

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
    expect(setPreferredTheme).toHaveBeenCalledWith("dark");
  });

  it("calls next-themes' setTheme and mirrors the choice into the preferences store when Light is selected", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: "Change theme" }));
    await user.click(screen.getByText("Light"));

    expect(mockSetTheme).toHaveBeenCalledWith("light");
    expect(setPreferredTheme).toHaveBeenCalledWith("light");
  });
});
