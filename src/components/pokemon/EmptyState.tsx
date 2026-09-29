"use client";

import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = "No Pokémon found",
  message = "Try adjusting your search or filters to find a Pokémon.",
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
      <Heading as="h2" size="md" mb={2}>
        {title}
      </Heading>
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
