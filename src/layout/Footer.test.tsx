import {
  describe,
  expect,
  it,
} from "vitest";

import {
  render,
  screen,
} from "../test-utils/render";

import Footer from "./Footer";

describe("Footer", () => {
  it("renders the footer text", () => {
    render(<Footer />);

    expect(
      screen.getByText(
        /Pokédex\. All rights reserved\./i,
      ),
    ).toBeInTheDocument();
  });

  it("renders the current year", () => {
    render(<Footer />);

    const currentYear =
      new Date().getFullYear().toString();

    expect(
      screen.getByText(
        new RegExp(currentYear),
      ),
    ).toBeInTheDocument();
  });
});
