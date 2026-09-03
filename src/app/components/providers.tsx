"use client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ColorModeProvider } from "./ui/color-mode";

// These imports exist for their side effect: each persistence module
// calls syncObservable(...) at module-evaluation time, which wires the
// corresponding store up to localStorage. Without importing them
// somewhere that's guaranteed to load, syncObservable never runs and
// the stores silently reset on every page load despite being fully
// implemented.
import "~/features/favorites/favorites.persistence";
import "~/features/preferences/preferences.persistence";
import "~/features/recently-viewed/recently-viewed.persistence";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider attribute="class" enableSystem>
          {children}
        </ColorModeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
