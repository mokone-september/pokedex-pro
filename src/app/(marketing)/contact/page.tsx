import { Box, Container, Heading, Text } from "@chakra-ui/react";

export default function ContactPage() {
  return (
    <Box as="main" py={{ base: 12, md: 20 }}>
      <Container maxW="4xl">
        <Heading as="h1" size="2xl" mb={6}>
          Contact
        </Heading>

        <Text fontSize="lg" color="gray.600">
          Have a question about Pokédex Pro? Get in touch with us.
        </Text>
      </Container>
    </Box>
  );
}
