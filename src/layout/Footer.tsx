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
      borderColor="border"
      bg="bg.panel"
      mt="auto"
    >
      <Container
        maxW="1200px"
        py={6}
        textAlign="center"
      >
        <Text
          fontSize="sm"
          color="fg.muted"
        >
          © {currentYear} Pokédex. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}
