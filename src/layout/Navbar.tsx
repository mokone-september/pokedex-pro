import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";
import Container from "./Container";

export default function Navbar() {
  return (
    <Box
      as="header"
      borderBottomWidth="1px"
      position="sticky"
      top={0}
      bg="bg"
      zIndex={100}
    >
      <Container>
        <Flex h="70px" align="center" justify="space-between">
          <Heading size="md">Pokedex Pro</Heading>

          <Flex gap={6} align="center">
            <Link href="/">Home</Link>
            <Link href="/pokemon">Pokemon</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>

            <Button colorPalette="blue">Sign In</Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
