import { describe, expect, it } from "vitest";

import { customRender, screen } from "~/test/render";

import Container from "./Container";

describe("Container", () => {
  it("renders children", () => {
    customRender(
      <Container>
        <p>Hello World</p>
      </Container>,
    );

    expect(
      screen.getByText("Hello World"),
    ).toBeInTheDocument();
  });
});
