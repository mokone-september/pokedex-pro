import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      {children}
    </ChakraProvider>
  );
}

export function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, {
    wrapper: AllProviders,
    ...options,
  });
}

export * from "@testing-library/react";
