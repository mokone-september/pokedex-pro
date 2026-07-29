import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import Container from "./Container";

describe("Container", () => {
  it("renders children", () => {
    render(
      <Container>
        <p>Hello World</p>
      </Container>,
    );

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
