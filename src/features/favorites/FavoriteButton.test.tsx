import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  trackPokemonFavorited,
  trackPokemonUnfavorited,
} from "~/lib/analytics";
import { FavoriteButton } from "./FavoriteButton";
import { addFavorite, clearFavorites, isFavorite } from "./favorites.store";

vi.mock("~/lib/analytics", () => ({
  trackPokemonFavorited: vi.fn(),
  trackPokemonUnfavorited: vi.fn(),
}));

// NOTE: if this project already has a shared test render helper
// (e.g. src/test-utils/render.tsx) that wraps ChakraProvider, prefer
// importing that instead of this local one, so all tests stay
// consistent with your actual theme/system config.
function renderWithChakra(ui: ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return {
    queryClient,
    ...render(withProviders(queryClient, ui)),
  };
}

function withProviders(queryClient: QueryClient, ui: ReactElement) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>
    </QueryClientProvider>
  );
}

function createDeferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });

  return { promise, resolve, reject };
}

const pikachu = { id: 25, name: "pikachu", image: "/pikachu.png" };
const bulbasaur = { id: 1, name: "bulbasaur", image: "/bulbasaur.png" };

const mocks = vi.hoisted(() => ({
  useSession: vi.fn(),
  listFetch: vi.fn(),
  listQuery: vi.fn(),
  addUseMutation: vi.fn(),
  removeUseMutation: vi.fn(),
  addMutateAsync: vi.fn(),
  removeMutateAsync: vi.fn(),
}));

vi.mock("~/server/better-auth/client", () => ({
  authClient: { useSession: mocks.useSession },
}));

vi.mock("~/trpc/react", () => ({
  api: {
    favorites: {
      add: { useMutation: mocks.addUseMutation },
      remove: { useMutation: mocks.removeUseMutation },
    },
    useUtils: () => ({
      favorites: { list: { fetch: mocks.listFetch } },
      client: { favorites: { list: { query: mocks.listQuery } } },
    }),
  },
}));

beforeEach(() => {
  clearFavorites();
  vi.clearAllMocks();
  mocks.useSession.mockReturnValue({ data: null, isPending: false });
  mocks.listFetch.mockResolvedValue([]);
  mocks.listQuery.mockResolvedValue([]);
  mocks.addMutateAsync.mockResolvedValue(undefined);
  mocks.removeMutateAsync.mockResolvedValue(undefined);
  mocks.addUseMutation.mockReturnValue({
    mutateAsync: mocks.addMutateAsync,
    isPending: false,
  });
  mocks.removeUseMutation.mockReturnValue({
    mutateAsync: mocks.removeMutateAsync,
    isPending: false,
  });
});

describe("FavoriteButton", () => {
  it("renders the add favorite state when not favorited", () => {
    renderWithChakra(<FavoriteButton pokemon={pikachu} />);
    const button = screen.getByRole("button", {
      name: "Add pikachu to favorites",
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("renders the remove favorite state when already favorited", () => {
    addFavorite(pikachu);

    renderWithChakra(<FavoriteButton pokemon={pikachu} />);
    const button = screen.getByRole("button", {
      name: "Remove pikachu from favorites",
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("adds the pokemon to favorites when clicked from the unfavorited state", async () => {
    const user = userEvent.setup();
    renderWithChakra(<FavoriteButton pokemon={pikachu} />);

    const button = await screen.findByRole("button", {
      name: "Add pikachu to favorites",
    });
    await waitFor(() => expect(button).toBeEnabled());
    await user.click(button);

    expect(isFavorite(pikachu.id)).toBe(true);
    expect(trackPokemonFavorited).toHaveBeenCalledWith(pikachu);
    expect(trackPokemonUnfavorited).not.toHaveBeenCalled();
    expect(
      screen.getByRole("button", { name: "Remove pikachu from favorites" }),
    ).toBeInTheDocument();
  });

  it("removes the pokemon from favorites when clicked from the favorited state", async () => {
    addFavorite(pikachu);
    const user = userEvent.setup();

    renderWithChakra(<FavoriteButton pokemon={pikachu} />);

    await user.click(
      screen.getByRole("button", { name: "Remove pikachu from favorites" }),
    );

    expect(isFavorite(pikachu.id)).toBe(false);
    expect(trackPokemonUnfavorited).toHaveBeenCalledWith(pikachu);
    expect(trackPokemonFavorited).not.toHaveBeenCalled();
    expect(
      screen.getByRole("button", { name: "Add pikachu to favorites" }),
    ).toBeInTheDocument();
  });

  it("persists authenticated additions through the favorites API", async () => {
    const user = userEvent.setup();
    mocks.useSession.mockReturnValue({
      data: { user: { id: "user-1" } },
      isPending: false,
    });
    renderWithChakra(<FavoriteButton pokemon={pikachu} />);

    await user.click(
      screen.getByRole("button", { name: "Add pikachu to favorites" }),
    );

    expect(mocks.addMutateAsync).toHaveBeenCalledWith({
      pokemonId: pikachu.id,
      name: pikachu.name,
      image: pikachu.image,
    });
    expect(trackPokemonFavorited).toHaveBeenCalledWith(pikachu);
    expect(isFavorite(pikachu.id)).toBe(false);
  });

  it("uses server favorites to remove an authenticated favorite", async () => {
    const user = userEvent.setup();
    mocks.useSession.mockReturnValue({
      data: { user: { id: "user-1" } },
      isPending: false,
    });
    mocks.listQuery.mockResolvedValue([
      { pokemonId: pikachu.id, name: pikachu.name, image: pikachu.image },
    ]);
    renderWithChakra(<FavoriteButton pokemon={pikachu} />);

    const button = await screen.findByRole("button", {
      name: "Remove pikachu from favorites",
    });
    await waitFor(() => expect(button).toBeEnabled());
    await user.click(button);

    expect(mocks.removeMutateAsync).toHaveBeenCalledWith({
      pokemonId: pikachu.id,
    });
    expect(trackPokemonUnfavorited).toHaveBeenCalledWith(pikachu);
    expect(
      screen.getByRole("button", { name: "Add pikachu to favorites" }),
    ).toBeInTheDocument();
  });

  it("isolates favorite data when switching accounts", async () => {
    mocks.useSession.mockReturnValue({
      data: { user: { id: "user-a" } },
      isPending: false,
    });
    mocks.listQuery
      .mockResolvedValueOnce([
        { pokemonId: pikachu.id, name: pikachu.name, image: pikachu.image },
      ])
      .mockResolvedValueOnce([]);
    const { queryClient, rerender } = renderWithChakra(
      <FavoriteButton pokemon={pikachu} />,
    );

    const removeButton = await screen.findByRole("button", {
      name: "Remove pikachu from favorites",
    });
    await waitFor(() => expect(removeButton).toBeEnabled());

    mocks.useSession.mockReturnValue({
      data: { user: { id: "user-b" } },
      isPending: false,
    });
    rerender(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <FavoriteButton pokemon={pikachu} />
        </ChakraProvider>
      </QueryClientProvider>,
    );

    expect(
      await screen.findByRole("button", { name: "Add pikachu to favorites" }),
    ).toBeInTheDocument();
    expect(mocks.listQuery).toHaveBeenCalledTimes(2);
    expect(mocks.listFetch).not.toHaveBeenCalled();
    expect(
      queryClient.getQueryData(["user-favorites", "user-a"]),
    ).toBeUndefined();
  });

  it("ignores Account A's late favorites query after switching to Account B", async () => {
    const accountARequest = createDeferred<
      { pokemonId: number; name: string; image: string | null }[]
    >();
    let accountASignal: AbortSignal | undefined;
    const accountAFetch = vi.fn((signal: AbortSignal | undefined) => {
      accountASignal = signal;
    });
    mocks.useSession.mockReturnValue({
      data: { user: { id: "user-a" } },
      isPending: false,
    });
    mocks.listQuery.mockImplementationOnce(
      (_input: undefined, options: { signal?: AbortSignal }) => {
        accountAFetch(options.signal);
        return accountARequest.promise;
      },
    );
    const { queryClient, rerender } = renderWithChakra(
      <FavoriteButton pokemon={pikachu} />,
    );
    await waitFor(() => expect(accountAFetch).toHaveBeenCalledOnce());

    mocks.useSession.mockReturnValue({
      data: { user: { id: "user-b" } },
      isPending: false,
    });
    mocks.listQuery.mockResolvedValueOnce([
      {
        pokemonId: bulbasaur.id,
        name: bulbasaur.name,
        image: bulbasaur.image,
      },
    ]);
    rerender(
      withProviders(queryClient, <FavoriteButton pokemon={pikachu} />),
    );
    await waitFor(() => expect(mocks.listQuery).toHaveBeenCalledTimes(2));
    expect(accountASignal?.aborted).toBe(true);

    expect(
      await screen.findByRole("button", { name: "Add pikachu to favorites" }),
    ).toBeInTheDocument();
    expect(
      queryClient.getQueryData(["user-favorites", "user-b"]),
    ).toEqual([
      {
        pokemonId: bulbasaur.id,
        name: bulbasaur.name,
        image: bulbasaur.image,
      },
    ]);

    accountARequest.resolve([
      { pokemonId: pikachu.id, name: pikachu.name, image: pikachu.image },
    ]);
    await accountARequest.promise;
    await waitFor(() =>
      expect(
        queryClient.getQueryData(["user-favorites", "user-a"]),
      ).toBeUndefined(),
    );
    expect(
      queryClient.getQueryData(["user-favorites", "user-b"]),
    ).toEqual([
      {
        pokemonId: bulbasaur.id,
        name: bulbasaur.name,
        image: bulbasaur.image,
      },
    ]);
    expect(
      screen.getByRole("button", { name: "Add pikachu to favorites" }),
    ).toBeInTheDocument();
  });

  it("does not expose Account A's late favorites query after signing out", async () => {
    const accountARequest = createDeferred<
      { pokemonId: number; name: string; image: string | null }[]
    >();
    mocks.useSession.mockReturnValue({
      data: { user: { id: "user-a" } },
      isPending: false,
    });
    mocks.listQuery.mockReturnValueOnce(accountARequest.promise);
    const { queryClient, rerender } = renderWithChakra(
      <FavoriteButton pokemon={pikachu} />,
    );
    await waitFor(() => expect(mocks.listQuery).toHaveBeenCalledOnce());

    mocks.useSession.mockReturnValue({ data: null, isPending: false });
    rerender(
      withProviders(queryClient, <FavoriteButton pokemon={pikachu} />),
    );
    expect(
      screen.getByRole("button", { name: "Add pikachu to favorites" }),
    ).toBeInTheDocument();

    accountARequest.resolve([
      { pokemonId: pikachu.id, name: pikachu.name, image: pikachu.image },
    ]);
    await accountARequest.promise;
    await waitFor(() =>
      expect(
        queryClient.getQueryData(["user-favorites", "user-a"]),
      ).toBeUndefined(),
    );
    expect(
      screen.getByRole("button", { name: "Add pikachu to favorites" }),
    ).toBeInTheDocument();
  });

  it("does not apply a pending Account A add mutation to Account B's cache", async () => {
    const user = userEvent.setup();
    const accountAAdd = createDeferred<void>();
    mocks.useSession.mockReturnValue({
      data: { user: { id: "user-a" } },
      isPending: false,
    });
    mocks.listQuery
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        {
          pokemonId: bulbasaur.id,
          name: bulbasaur.name,
          image: bulbasaur.image,
        },
      ]);
    mocks.addMutateAsync.mockReturnValueOnce(accountAAdd.promise);
    const { queryClient, rerender } = renderWithChakra(
      <FavoriteButton pokemon={pikachu} />,
    );
    const addButton = await screen.findByRole("button", {
      name: "Add pikachu to favorites",
    });
    await waitFor(() => expect(addButton).toBeEnabled());
    await user.click(addButton);
    await waitFor(() => expect(mocks.addMutateAsync).toHaveBeenCalledOnce());

    mocks.useSession.mockReturnValue({
      data: { user: { id: "user-b" } },
      isPending: false,
    });
    rerender(
      withProviders(queryClient, <FavoriteButton pokemon={pikachu} />),
    );
    await waitFor(() =>
      expect(queryClient.getQueryData(["user-favorites", "user-b"])).toEqual([
        {
          pokemonId: bulbasaur.id,
          name: bulbasaur.name,
          image: bulbasaur.image,
        },
      ]),
    );

    accountAAdd.resolve();
    await accountAAdd.promise;
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Add pikachu to favorites" }),
      ).toBeInTheDocument(),
    );
    expect(
      queryClient.getQueryData(["user-favorites", "user-b"]),
    ).toEqual([
      {
        pokemonId: bulbasaur.id,
        name: bulbasaur.name,
        image: bulbasaur.image,
      },
    ]);
  });

  it("does not apply a pending Account A remove mutation to Account B's cache", async () => {
    const user = userEvent.setup();
    const accountARemove = createDeferred<{ removed: boolean }>();
    mocks.useSession.mockReturnValue({
      data: { user: { id: "user-a" } },
      isPending: false,
    });
    mocks.listQuery
      .mockResolvedValueOnce([
        { pokemonId: pikachu.id, name: pikachu.name, image: pikachu.image },
      ])
      .mockResolvedValueOnce([
        { pokemonId: pikachu.id, name: pikachu.name, image: pikachu.image },
        {
          pokemonId: bulbasaur.id,
          name: bulbasaur.name,
          image: bulbasaur.image,
        },
      ]);
    mocks.removeMutateAsync.mockReturnValueOnce(accountARemove.promise);
    const { queryClient, rerender } = renderWithChakra(
      <FavoriteButton pokemon={pikachu} />,
    );
    const removeButton = await screen.findByRole("button", {
      name: "Remove pikachu from favorites",
    });
    await waitFor(() => expect(removeButton).toBeEnabled());
    await user.click(removeButton);
    await waitFor(() =>
      expect(mocks.removeMutateAsync).toHaveBeenCalledOnce(),
    );

    mocks.useSession.mockReturnValue({
      data: { user: { id: "user-b" } },
      isPending: false,
    });
    rerender(
      withProviders(queryClient, <FavoriteButton pokemon={pikachu} />),
    );
    await waitFor(() =>
      expect(queryClient.getQueryData(["user-favorites", "user-b"])).toEqual([
        { pokemonId: pikachu.id, name: pikachu.name, image: pikachu.image },
        { pokemonId: bulbasaur.id, name: bulbasaur.name, image: bulbasaur.image },
      ]),
    );

    accountARemove.resolve({ removed: true });
    await accountARemove.promise;
    expect(
      screen.getByRole("button", { name: "Remove pikachu from favorites" }),
    ).toBeInTheDocument();
    expect(
      queryClient.getQueryData(["user-favorites", "user-b"]),
    ).toEqual([
      { pokemonId: pikachu.id, name: pikachu.name, image: pikachu.image },
      { pokemonId: bulbasaur.id, name: bulbasaur.name, image: bulbasaur.image },
    ]);
  });

  it("shows guest favorites after signing out instead of server favorites", async () => {
    mocks.useSession.mockReturnValue({
      data: { user: { id: "user-a" } },
      isPending: false,
    });
    mocks.listQuery.mockResolvedValue([
      { pokemonId: pikachu.id, name: pikachu.name, image: pikachu.image },
    ]);
    const { queryClient, rerender } = renderWithChakra(
      <FavoriteButton pokemon={pikachu} />,
    );
    expect(
      await screen.findByRole("button", {
        name: "Remove pikachu from favorites",
      }),
    ).toBeInTheDocument();

    mocks.useSession.mockReturnValue({ data: null, isPending: false });
    rerender(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <FavoriteButton pokemon={pikachu} />
        </ChakraProvider>
      </QueryClientProvider>,
    );

    expect(
      screen.getByRole("button", { name: "Add pikachu to favorites" }),
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(
        queryClient.getQueryData(["user-favorites", "user-a"]),
      ).toBeUndefined(),
    );
  });

  it("updates cached server favorites immediately after add", async () => {
    const user = userEvent.setup();
    mocks.useSession.mockReturnValue({
      data: { user: { id: "user-1" } },
      isPending: false,
    });
    const { queryClient, rerender } = renderWithChakra(
      <FavoriteButton pokemon={pikachu} />,
    );

    const addButton = await screen.findByRole("button", {
      name: "Add pikachu to favorites",
    });
    await waitFor(() => expect(addButton).toBeEnabled());
    await user.click(addButton);

    expect(
      await screen.findByRole("button", { name: "Remove pikachu from favorites" }),
    ).toBeInTheDocument();
    rerender(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <FavoriteButton pokemon={pikachu} />
        </ChakraProvider>
      </QueryClientProvider>,
    );
    expect(
      screen.getByRole("button", { name: "Remove pikachu from favorites" }),
    ).toBeInTheDocument();
  });

  it("preserves guest favorites when an authenticated add completes after sign-out", async () => {
    const user = userEvent.setup();
    const accountAAdd = createDeferred<void>();
    addFavorite(bulbasaur);
    mocks.useSession.mockReturnValue({
      data: { user: { id: "user-a" } },
      isPending: false,
    });
    mocks.listQuery.mockResolvedValueOnce([]);
    mocks.addMutateAsync.mockReturnValueOnce(accountAAdd.promise);
    const { queryClient, rerender } = renderWithChakra(
      <FavoriteButton pokemon={pikachu} />,
    );
    const addButton = await screen.findByRole("button", {
      name: "Add pikachu to favorites",
    });
    await waitFor(() => expect(addButton).toBeEnabled());
    await user.click(addButton);
    await waitFor(() => expect(mocks.addMutateAsync).toHaveBeenCalledOnce());

    mocks.useSession.mockReturnValue({ data: null, isPending: false });
    rerender(
      withProviders(queryClient, <FavoriteButton pokemon={pikachu} />),
    );
    expect(
      screen.getByRole("button", { name: "Add pikachu to favorites" }),
    ).toBeInTheDocument();

    accountAAdd.resolve();
    await accountAAdd.promise;
    expect(isFavorite(bulbasaur.id)).toBe(true);
    expect(isFavorite(pikachu.id)).toBe(false);
    expect(
      screen.getByRole("button", { name: "Add pikachu to favorites" }),
    ).toBeInTheDocument();
  });

  it("reports authenticated mutation failures without changing guest favorites", async () => {
    const user = userEvent.setup();
    mocks.useSession.mockReturnValue({
      data: { user: { id: "user-1" } },
      isPending: false,
    });
    mocks.addMutateAsync.mockRejectedValue(new Error("Request failed"));
    renderWithChakra(<FavoriteButton pokemon={pikachu} />);

    const button = await screen.findByRole("button", {
      name: "Add pikachu to favorites",
    });
    await waitFor(() => expect(button).toBeEnabled());
    await user.click(button);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Unable to update favorites. Please try again.",
    );
    expect(isFavorite(pikachu.id)).toBe(false);
    expect(trackPokemonFavorited).not.toHaveBeenCalled();
  });
});
