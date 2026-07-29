import { render, screen } from "@testing-library/react";
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
