"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { TRPCReactProvider } from "~/trpc/react";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </ChakraProvider>
  );
}
