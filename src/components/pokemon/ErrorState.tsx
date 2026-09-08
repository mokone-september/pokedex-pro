"use client";

import { Box, Button, Text } from "@chakra-ui/react";
import { RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export default function ErrorState({
  message = "Something went wrong loading Pokémon.",
  onRetry,
}: ErrorStateProps) {
  return (
    <Box
      borderWidth="1px"
      borderColor="border"
      borderRadius="xl"
      bg="bg.panel"
      p={8}
      textAlign="center"
    >
      <Text color="fg.muted" mb={4}>
        {message}
      </Text>
      <Button
        type="button"
        onClick={onRetry}
        colorPalette="blue"
        size="sm"
      >
        <RefreshCw size={16} />
        Try again
      </Button>
    </Box>
  );
}
