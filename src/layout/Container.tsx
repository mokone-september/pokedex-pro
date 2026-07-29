import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <Box
      maxW="7xl"
      mx="auto"
      px={{ base: 4, md: 6, lg: 8 }}
      w="100%"
    >
      {children}
    </Box>
  );
}
