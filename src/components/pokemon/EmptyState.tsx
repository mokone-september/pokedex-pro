"use client";

import { Box, Button, Text } from "@chakra-ui/react";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  message = "No Pokémon match your search.",
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <Box
      borderWidth="1px"
      borderColor="border"
      borderRadius="xl"
      bg="bg.panel"
      p={8}
      textAlign="center"
    >
      <Box display="flex" justifyContent="center" mb={3} color="fg.muted">
        <SearchX size={32} />
      </Box>
      <Text color="fg.muted" mb={onAction ? 4 : 0}>
        {message}
      </Text>
      {onAction && actionLabel && (
        <Button
          type="button"
          onClick={onAction}
          variant="outline"
          size="sm"
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
