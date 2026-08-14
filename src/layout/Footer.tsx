"use client";

import {
  Box,
  Container,
  Text,
} from "@chakra-ui/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      as="footer"
      borderTopWidth="1px"
      borderColor="gray.200"
      bg="white"
      mt="auto"
    >
      <Container
        maxW="1200px"
        py={6}
        textAlign="center"
      >
        <Text
          fontSize="sm"
          color="gray.600"
        >
          © {currentYear} Pokédex. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}
