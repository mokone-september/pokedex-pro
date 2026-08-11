import {
  ChakraProvider,
  defaultSystem,
} from "@chakra-ui/react";

import {
  render as rtlRender,
} from "@testing-library/react";

import type {
  RenderOptions,
} from "@testing-library/react";

import type {
  ReactElement,
  ReactNode,
} from "react";

function TestProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ChakraProvider value={defaultSystem}>
      {children}
    </ChakraProvider>
  );
}

function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return rtlRender(ui, {
    wrapper: TestProvider,
    ...options,
  });
}

export * from "@testing-library/react";

export {
  render,
};
