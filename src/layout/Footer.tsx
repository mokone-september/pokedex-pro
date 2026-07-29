import { Box, Text } from "@chakra-ui/react";
import Container from "./Container";

export default function Footer() {
  return (
    <Box as="footer" py={10} borderTopWidth="1px" mt={20}>
      <Container>
        <Text textAlign="center" color="fg.muted">
          © {new Date().getFullYear()} Pokedex Pro. Built with Next.js, Chakra UI and tRPC.
        </Text>
      </Container>
    </Box>
  );
}
