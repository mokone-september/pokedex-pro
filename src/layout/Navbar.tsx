"use client";
import NextLink from "next/link";
import {
  Box,
  Button,
  Container,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import { ThemeToggle } from "~/features/preferences/ThemeToggle";

export default function Navbar() {
  return (
    <Box
      as="nav"
      borderBottomWidth="1px"
      borderColor="border"
      bg="bg.panel"
    >
      <Container maxW="1200px" py={4}>
        <HStack
          justify="space-between"
          align="center"
        >
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
          <HStack gap={6}>
            <Link
              asChild
              color="fg.muted"
              fontWeight="medium"
              _hover={{
                color: "blue.600",
                textDecoration: "none",
              }}
            >
              <NextLink href="/">
                Home
              </NextLink>
            </Link>
            <Link
              asChild
              color="fg.muted"
              fontWeight="medium"
              _hover={{
                color: "blue.600",
                textDecoration: "none",
              }}
            >
              <NextLink href="/pokemon">
                Pokémon
              </NextLink>
            </Link>
            <ThemeToggle />
            <Button
              size="sm"
              colorPalette="blue"
            >
              Sign In
            </Button>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}
