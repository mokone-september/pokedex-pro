import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { RecentlyViewedList } from "./RecentlyViewedList";
import { addRecentlyViewed, clearRecentlyViewed } from "./recently-viewed.store";

function renderWithChakra(ui: ReactElement) {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>);
}

const pikachu = { id: 25, name: "pikachu", image: "/pikachu.png" };
const bulbasaur = { id: 1, name: "bulbasaur", image: null };

beforeEach(() => {
  clearRecentlyViewed();
});

describe("RecentlyViewedList", () => {
  it("renders nothing when there is no history", () => {
    const { container } = renderWithChakra(<RecentlyViewedList />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders an entry for each recently viewed pokemon", () => {
    addRecentlyViewed(pikachu);
    addRecentlyViewed(bulbasaur);

    renderWithChakra(<RecentlyViewedList />);

    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });

  it("removes a single item when its remove button is clicked", async () => {
    addRecentlyViewed(pikachu);
    addRecentlyViewed(bulbasaur);
    const user = userEvent.setup();

    renderWithChakra(<RecentlyViewedList />);

    await user.click(
      screen.getByRole("button", {
        name: "Remove pikachu from recently viewed",
      }),
    );

    expect(screen.queryByText("pikachu")).not.toBeInTheDocument();
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });

  it("clears the whole list when Clear all is clicked", async () => {
    addRecentlyViewed(pikachu);
    addRecentlyViewed(bulbasaur);
    const user = userEvent.setup();

    renderWithChakra(<RecentlyViewedList />);
    await user.click(screen.getByRole("button", { name: "Clear all" }));

    expect(screen.queryByText("pikachu")).not.toBeInTheDocument();
    expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
  });
});
