import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders the footer text", () => {
    render(<Footer />);

    expect(screen.getByText(/Pokedex Pro/i)).toBeInTheDocument();
  });

  it("renders the current year", () => {
    render(<Footer />);

    expect(
      screen.getByText(new Date().getFullYear().toString()),
    ).toBeInTheDocument();
  });
});
