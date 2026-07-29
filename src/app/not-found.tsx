import Link from "next/link";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Box py={24}>
      <VStack gap={6}>
        <Heading size="2xl">404</Heading>

        <Text color="gray.500">
          Sorry, this page could not be found.
        </Text>

        <Button asChild colorScheme="blue">
          <Link href="/">Back Home</Link>
        </Button>
      </VStack>
    </Box>
  );
}
