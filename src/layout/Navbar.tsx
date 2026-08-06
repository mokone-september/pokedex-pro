import Image from "next/image";
import Link from "next/link";

import { Box, Container, Flex, Heading } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Box
      as="header"
      borderBottomWidth="1px"
      bg="bg"
      py={4}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW="7xl">
        <Flex align="center" justify="space-between">
          <Link href="/">
            <Flex align="center" gap={3}>
              <Image
                src="/logo.svg"
                alt="Pokedex Pro Logo"
                width={40}
                height={40}
                priority
              />

              <Heading size="lg">Pokédex Pro</Heading>
            </Flex>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}
