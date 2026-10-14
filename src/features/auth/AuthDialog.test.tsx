import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "~/test-utils/render";
import { AuthDialog } from "./AuthDialog";

const mocks = vi.hoisted(() => ({
  signInEmail: vi.fn(),
  signInSocial: vi.fn(),
  signUpEmail: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
}));

vi.mock("~/server/better-auth/client", () => ({
  authClient: {
    signIn: {
      email: mocks.signInEmail,
      social: mocks.signInSocial,
    },
    signUp: { email: mocks.signUpEmail },
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mocks.replace,
    refresh: mocks.refresh,
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
  mocks.signInEmail.mockResolvedValue({ data: { token: "session" }, error: null });
  mocks.signUpEmail.mockResolvedValue({ data: { token: "session" }, error: null });
  mocks.signInSocial.mockResolvedValue({ data: { url: "https://github.com" }, error: null });
});

function renderDialog() {
  const onOpenChange = vi.fn();
  render(<AuthDialog open onOpenChange={onOpenChange} />);
  return { onOpenChange };
}

describe("AuthDialog", () => {
  it("validates missing and malformed sign-in input accessibly", async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByRole("button", { name: "Sign in" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Enter a valid email address.",
    );
    expect(mocks.signInEmail).not.toHaveBeenCalled();
  });

  it("signs in and returns to the home page after success", async () => {
    const user = userEvent.setup();
    const { onOpenChange } = renderDialog();

    await user.type(screen.getByLabelText("Email"), "ash@example.com");
    await user.type(screen.getByLabelText("Password"), "correct-horse");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(mocks.signInEmail).toHaveBeenCalledWith({
      email: "ash@example.com",
      password: "correct-horse",
      callbackURL: "/",
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(mocks.replace).toHaveBeenCalledWith("/");
    expect(mocks.refresh).toHaveBeenCalledOnce();
  });

  it("shows authentication failures without closing the dialog", async () => {
    const user = userEvent.setup();
    const { onOpenChange } = renderDialog();
    mocks.signInEmail.mockResolvedValue({
      data: null,
      error: { message: "Invalid email or password" },
    });

    await user.type(screen.getByLabelText("Email"), "ash@example.com");
    await user.type(screen.getByLabelText("Password"), "wrong-password");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Invalid email or password",
    );
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("shows a useful message when the authentication request fails", async () => {
    const user = userEvent.setup();
    renderDialog();
    mocks.signInEmail.mockRejectedValue(new Error("Network unavailable"));

    await user.type(screen.getByLabelText("Email"), "ash@example.com");
    await user.type(screen.getByLabelText("Password"), "correct-horse");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Network unavailable",
    );
  });

  it("validates sign-up password length and creates an account", async () => {
    const user = userEvent.setup();
    const { onOpenChange } = renderDialog();

    await user.click(screen.getByRole("button", { name: "Create an account" }));
    await user.type(screen.getByLabelText("Name"), "Ash Ketchum");
    await user.type(screen.getByLabelText("Email"), "ash@example.com");
    await user.type(screen.getByLabelText("Password"), "short");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Your password must be at least 8 characters.",
    );
    expect(mocks.signUpEmail).not.toHaveBeenCalled();

    await user.clear(screen.getByLabelText("Password"));
    await user.type(screen.getByLabelText("Password"), "correct-horse");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(mocks.signUpEmail).toHaveBeenCalledWith({
      name: "Ash Ketchum",
      email: "ash@example.com",
      password: "correct-horse",
      callbackURL: "/",
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("starts GitHub sign-in and reports provider errors", async () => {
    const user = userEvent.setup();
    renderDialog();
    mocks.signInSocial.mockResolvedValue({
      data: null,
      error: { message: "GitHub is unavailable" },
    });

    await user.click(
      screen.getByRole("button", { name: "Continue with GitHub" }),
    );

    expect(mocks.signInSocial).toHaveBeenCalledWith({
      provider: "github",
      callbackURL: "/",
    });
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "GitHub is unavailable",
    );
  });
});
