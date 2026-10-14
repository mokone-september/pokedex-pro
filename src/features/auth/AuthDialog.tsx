"use client";

import {
  Button,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "~/server/better-auth/client";

type AuthMode = "sign-in" | "sign-up";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function changeMode(nextMode: AuthMode): void {
    setMode(nextMode);
    setError(null);
  }

  function validate(): string | null {
    if (mode === "sign-up" && !name.trim()) {
      return "Enter your name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Enter a valid email address.";
    }
    if (!password) {
      return "Enter your password.";
    }
    if (mode === "sign-up" && password.length < 8) {
      return "Your password must be at least 8 characters.";
    }
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setPending(true);
    try {
      const result =
        mode === "sign-up"
          ? await authClient.signUp.email({
              name: name.trim(),
              email: email.trim(),
              password,
              callbackURL: "/",
            })
          : await authClient.signIn.email({
              email: email.trim(),
              password,
              callbackURL: "/",
            });

      if (result.error) {
        setError(result.error.message ?? "Authentication failed. Try again.");
        return;
      }

      onOpenChange(false);
      router.replace("/");
      router.refresh();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to authenticate. Check your connection and try again.",
      );
    } finally {
      setPending(false);
    }
  }

  async function handleGitHubSignIn() {
    setError(null);
    setPending(true);
    try {
      const result = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
      if (result.error) {
        setError(result.error.message ?? "GitHub sign-in failed. Try again.");
      }
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to start GitHub sign-in. Try again.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={({ open: nextOpen }) => onOpenChange(nextOpen)}
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {mode === "sign-in" ? "Sign in" : "Create an account"}
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  aria-label="Close authentication dialog"
                  position="absolute"
                  top="2"
                  right="2"
                  onClick={() => onOpenChange(false)}
                >
                  ×
                </Button>
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap={4}>
                <Text color="fg.muted">
                  {mode === "sign-in"
                    ? "Sign in to your Pokédex Pro account."
                    : "Create an account to get started."}
                </Text>

                <form onSubmit={handleSubmit} noValidate>
                  <Stack gap={4}>
                    {mode === "sign-up" && (
                      <Field.Root>
                        <Field.Label htmlFor="auth-name">Name</Field.Label>
                        <Input
                          id="auth-name"
                          autoComplete="name"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          aria-required="true"
                        />
                      </Field.Root>
                    )}

                    <Field.Root>
                      <Field.Label htmlFor="auth-email">Email</Field.Label>
                      <Input
                        id="auth-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        aria-required="true"
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label htmlFor="auth-password">Password</Field.Label>
                      <Input
                        id="auth-password"
                        type="password"
                        autoComplete={
                          mode === "sign-up"
                            ? "new-password"
                            : "current-password"
                        }
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        aria-required="true"
                        aria-describedby={
                          mode === "sign-up" ? "auth-password-hint" : undefined
                        }
                      />
                      {mode === "sign-up" && (
                        <Field.HelperText id="auth-password-hint">
                          Use at least 8 characters.
                        </Field.HelperText>
                      )}
                    </Field.Root>

                    {error && (
                      <Text role="alert" color="red.600">
                        {error}
                      </Text>
                    )}

                    <Button type="submit" colorPalette="blue" disabled={pending}>
                      {pending
                        ? "Please wait…"
                        : mode === "sign-in"
                          ? "Sign in"
                          : "Create account"}
                    </Button>
                  </Stack>
                </form>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGitHubSignIn}
                  disabled={pending}
                >
                  Continue with GitHub
                </Button>

                <Text>
                  {mode === "sign-in"
                    ? "New to Pokédex Pro?"
                    : "Already have an account?"}{" "}
                  <Button
                    type="button"
                    variant="plain"
                    colorPalette="blue"
                    onClick={() =>
                      changeMode(
                        mode === "sign-in" ? "sign-up" : "sign-in",
                      )
                    }
                  >
                    {mode === "sign-in" ? "Create an account" : "Sign in"}
                  </Button>
                </Text>
              </Stack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
