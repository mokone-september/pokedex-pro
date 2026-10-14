import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import { render, screen } from "../test-utils/render";

import Navbar from "./Navbar";

const mocks = vi.hoisted(() => ({
  signInEmail: vi.fn(),
  signInSocial: vi.fn(),
  signUpEmail: vi.fn(),
  signOut: vi.fn(),
  refetch: vi.fn(),
  refresh: vi.fn(),
  useSession: vi.fn(),
}));

vi.mock("~/server/better-auth/client", () => ({
  authClient: {
    signIn: {
      email: mocks.signInEmail,
      social: mocks.signInSocial,
    },
    signUp: { email: mocks.signUpEmail },
    signOut: mocks.signOut,
    useSession: mocks.useSession,
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: mocks.refresh, replace: vi.fn() }),
}));

beforeEach(() => {
  vi.clearAllMocks();
  mocks.useSession.mockReturnValue({
    data: null,
    isPending: false,
    isRefetching: false,
    error: null,
    refetch: mocks.refetch,
  });
  mocks.signOut.mockResolvedValue({ data: { success: true }, error: null });
  mocks.refetch.mockResolvedValue(undefined);
});

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

  it("opens the authentication dialog from the mobile sign-in item", async () => {
    const user = userEvent.setup();

    render(<Navbar />);
    await user.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );
    await user.click(screen.getByRole("menuitem", { name: "Sign In" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Sign in" }),
    ).toBeInTheDocument();
  });

  it("does not show sign-in controls while the session is loading", async () => {
    const user = userEvent.setup();
    mocks.useSession.mockReturnValue({
      data: null,
      isPending: true,
      isRefetching: false,
      error: null,
      refetch: mocks.refetch,
    });

    render(<Navbar />);
    await user.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );

    expect(
      screen.getByRole("menuitem", { name: "Checking account…" }),
    ).toHaveAttribute("aria-disabled", "true");
    expect(
      screen.queryByRole("menuitem", { name: "Sign In" }),
    ).not.toBeInTheDocument();
  });

  it("shows a session error and keeps the sign-in action available", async () => {
    const user = userEvent.setup();
    mocks.useSession.mockReturnValue({
      data: null,
      isPending: false,
      isRefetching: false,
      error: new Error("Unable to load session"),
      refetch: mocks.refetch,
    });

    render(<Navbar />);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Unable to load session",
    );
    await user.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );
    expect(
      screen.getByRole("menuitem", { name: "Sign In" }),
    ).toBeInTheDocument();
  });

  it("shows the signed-in user and signs them out", async () => {
    const user = userEvent.setup();
    mocks.useSession.mockReturnValue({
      data: { user: { name: "Ash Ketchum", email: "ash@example.com" } },
      isPending: false,
      isRefetching: false,
      error: null,
      refetch: mocks.refetch,
    });

    render(<Navbar />);

    expect(screen.getByText("Ash Ketchum")).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );
    await user.click(screen.getByRole("menuitem", { name: "Sign out" }));

    expect(mocks.signOut).toHaveBeenCalledOnce();
    expect(mocks.refetch).toHaveBeenCalledOnce();
    expect(mocks.refresh).toHaveBeenCalledOnce();
  });

  it.each([
    [
      "an API error",
      () =>
        mocks.signOut.mockResolvedValue({
          data: null,
          error: { message: "Unable to sign out" },
        }),
    ],
    [
      "a rejected request",
      () => mocks.signOut.mockRejectedValue(new Error("Network unavailable")),
    ],
  ])("keeps the user signed in and reports sign-out %s", async (_case, setup) => {
    const user = userEvent.setup();
    mocks.useSession.mockReturnValue({
      data: { user: { name: "Ash Ketchum", email: "ash@example.com" } },
      isPending: false,
      isRefetching: false,
      error: null,
      refetch: mocks.refetch,
    });
    setup();

    render(<Navbar />);
    await user.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );
    await user.click(screen.getByRole("menuitem", { name: "Sign out" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      _case === "an API error" ? "Unable to sign out" : "Network unavailable",
    );
    expect(mocks.refetch).not.toHaveBeenCalled();
    expect(mocks.refresh).not.toHaveBeenCalled();

    await user.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );
    expect(
      screen.getByRole("menuitem", { name: "Signed in as Ash Ketchum" }),
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
