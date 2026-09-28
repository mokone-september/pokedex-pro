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
import { ThemeToggle } from "~/features/preferences/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/", label: "Pokémon" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
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

            {/* Desktop-only Sign In: on mobile it lives inside the menu */}
            <Button
              size="sm"
              colorPalette="blue"
              display={{ base: "none", md: "inline-flex" }}
            >
              Sign In
            </Button>

            {/* Mobile-only hamburger menu: hidden at md and up */}
            <Box display={{ base: "block", md: "none" }}>
              <Menu.Root>
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
                    <Menu.Content>
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
                      <Menu.Item value="sign-in">Sign In</Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </Box>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}
