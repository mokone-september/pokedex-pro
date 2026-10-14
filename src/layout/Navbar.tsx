"use client";
import NextLink from "next/link";
import {
  Box,
  Button,
  Container,
  HStack,
  IconButton,
  Link,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import { Menu as MenuIcon } from "lucide-react";
import { useState } from "react";
import { AuthDialog } from "~/features/auth/AuthDialog";
import { ThemeToggle } from "~/features/preferences/ThemeToggle";
import { authClient } from "~/server/better-auth/client";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/", label: "Pokémon" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const router = useRouter();
  const sessionState = authClient.useSession();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);
  const user = sessionState.data?.user;
  const authError = signOutError ?? sessionState.error?.message ?? null;

  async function handleSignOut() {
    setSignOutError(null);
    setSigningOut(true);
    try {
      const result = await authClient.signOut();
      if (result.error) {
        setSignOutError(result.error.message ?? "Unable to sign out.");
        return;
      }
      await sessionState.refetch();
      router.refresh();
    } catch (cause) {
      setSignOutError(
        cause instanceof Error ? cause.message : "Unable to sign out.",
      );
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <Box
      as="nav"
      borderBottomWidth="1px"
      borderColor="border"
      bg="bg.panel"
    >
      <Container maxW="1200px" py={4}>
        <HStack justify="space-between" align="center">
          <Link
            asChild
            fontSize="xl"
            fontWeight="bold"
            color="fg"
            _hover={{
              textDecoration: "none",
            }}
          >
            <NextLink href="/">
              <Text>Pokédex</Text>
            </NextLink>
          </Link>

          <HStack gap={4}>
            {/* Desktop nav links: hidden below md */}
            <HStack gap={6} display={{ base: "none", md: "flex" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  asChild
                  color="fg.muted"
                  fontWeight="medium"
                  _hover={{
                    color: "blue.600",
                    textDecoration: "none",
                  }}
                >
                  <NextLink href={link.href}>{link.label}</NextLink>
                </Link>
              ))}
            </HStack>

            {/* Rendered once, visible at every breakpoint */}
            <ThemeToggle />

            <HStack display={{ base: "none", md: "flex" }} gap={2}>
              {sessionState.isPending ? (
                <Text color="fg.muted">Checking account…</Text>
              ) : user ? (
                <>
                  <Text aria-label="Signed in as">
                    {user.name ?? user.email}
                  </Text>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSignOut}
                    disabled={signingOut}
                  >
                    {signingOut ? "Signing out…" : "Sign out"}
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  colorPalette="blue"
                  onClick={() => setAuthDialogOpen(true)}
                >
                  Sign In
                </Button>
              )}
            </HStack>

            {/* Mobile-only hamburger menu: hidden at md and up */}
            <Box display={{ base: "block", md: "none" }}>
              <Menu.Root
                open={mobileMenuOpen}
                onOpenChange={(details) => setMobileMenuOpen(details.open)}
              >
                <Menu.Trigger asChild>
                  <IconButton
                    type="button"
                    aria-label="Open navigation menu"
                    variant="ghost"
                    size="sm"
                  >
                    <MenuIcon size={20} />
                  </IconButton>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content hidden={!mobileMenuOpen}>
                      {navLinks.map((link) => (
                        <Menu.Item
                          key={link.label}
                          value={link.label}
                          asChild
                        >
                          <NextLink href={link.href}>{link.label}</NextLink>
                        </Menu.Item>
                      ))}
                      <Menu.Separator />
                      {sessionState.isPending ? (
                        <Menu.Item value="checking-account" disabled>
                          Checking account…
                        </Menu.Item>
                      ) : user ? (
                        <>
                          <Menu.Item value="account" disabled>
                            Signed in as {user.name ?? user.email}
                          </Menu.Item>
                          <Menu.Item
                            value="sign-out"
                            onClick={handleSignOut}
                            disabled={signingOut}
                          >
                            {signingOut ? "Signing out…" : "Sign out"}
                          </Menu.Item>
                        </>
                      ) : (
                        <Menu.Item
                          value="sign-in"
                          onClick={() => setAuthDialogOpen(true)}
                        >
                          Sign In
                        </Menu.Item>
                      )}
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </Box>
          </HStack>
        </HStack>
        {authError && (
          <Text role="alert" color="red.600" mt={2}>
            {authError}
          </Text>
        )}
      </Container>
      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
      />
    </Box>
  );
}
