import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  findMany: vi.fn(),
  upsert: vi.fn(),
  deleteMany: vi.fn(),
}));

vi.mock("~/server/db", () => ({
  db: {
    favorite: {
      findMany: mocks.findMany,
      upsert: mocks.upsert,
      deleteMany: mocks.deleteMany,
    },
  },
}));

vi.mock("~/server/better-auth", () => ({
  auth: { api: { getSession: vi.fn() } },
}));

import type { db } from "~/server/db";
import type { auth } from "~/server/better-auth";
import { createCallerFactory } from "~/server/api/trpc";
import { favoritesRouter } from "./favorites";

const createCaller = createCallerFactory(favoritesRouter);
const now = new Date("2026-01-01T00:00:00.000Z");

function createSession(userId: string): NonNullable<
  Awaited<ReturnType<typeof auth.api.getSession>>
> {
  return {
    session: {
      id: "session-1",
      userId,
      expiresAt: now,
      token: "session-token",
      createdAt: now,
      updatedAt: now,
      ipAddress: null,
      userAgent: null,
    },
    user: {
      id: userId,
      name: "Ash Ketchum",
      email: "ash@example.com",
      emailVerified: false,
      image: null,
      createdAt: now,
      updatedAt: now,
    },
  };
}

function createTestCaller(userId: string | null) {
  const testDb = {
    favorite: {
      findMany: mocks.findMany,
      upsert: mocks.upsert,
      deleteMany: mocks.deleteMany,
    },
  } as unknown as typeof db;

  return createCaller({
    db: testDb,
    headers: new Headers(),
    session: userId ? createSession(userId) : null,
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.findMany.mockResolvedValue([]);
  mocks.upsert.mockResolvedValue({
    pokemonId: 25,
    name: "pikachu",
    image: "/pikachu.png",
  });
  mocks.deleteMany.mockResolvedValue({ count: 1 });
});

describe("favorites router", () => {
  it("rejects unauthenticated list, add, and remove requests", async () => {
    const caller = createTestCaller(null);

    await expect(caller.list()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    await expect(
      caller.add({
        pokemonId: 25,
        name: "pikachu",
        image: "/pikachu.png",
      }),
    ).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    await expect(caller.remove({ pokemonId: 25 })).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
    expect(mocks.findMany).not.toHaveBeenCalled();
    expect(mocks.upsert).not.toHaveBeenCalled();
    expect(mocks.deleteMany).not.toHaveBeenCalled();
  });

  it("lists only the authenticated user's favorites", async () => {
    const caller = createTestCaller("user-1");
    mocks.findMany.mockResolvedValue([
      { pokemonId: 25, name: "pikachu", image: "/pikachu.png" },
    ]);

    await expect(caller.list()).resolves.toEqual([
      { pokemonId: 25, name: "pikachu", image: "/pikachu.png" },
    ]);
    expect(mocks.findMany).toHaveBeenCalledWith({
      where: { userId: "user-1" },
      select: { pokemonId: true, name: true, image: true },
      orderBy: { createdAt: "desc" },
    });
  });

  it("upserts with the authenticated owner to make duplicate adds idempotent", async () => {
    const caller = createTestCaller("user-1");
    const input = {
      pokemonId: 25,
      name: "pikachu",
      image: "/pikachu.png",
    };

    await caller.add(input);
    await caller.add(input);

    expect(mocks.upsert).toHaveBeenCalledTimes(2);
    expect(mocks.upsert).toHaveBeenNthCalledWith(1, {
      where: { userId_pokemonId: { userId: "user-1", pokemonId: 25 } },
      create: {
        userId: "user-1",
        pokemonId: 25,
        name: "pikachu",
        image: "/pikachu.png",
      },
      update: { name: "pikachu", image: "/pikachu.png" },
      select: { pokemonId: true, name: true, image: true },
    });
  });

  it("removes only a matching favorite owned by the authenticated user", async () => {
    const caller = createTestCaller("user-1");

    await expect(caller.remove({ pokemonId: 25 })).resolves.toEqual({
      removed: true,
    });
    expect(mocks.deleteMany).toHaveBeenCalledWith({
      where: { userId: "user-1", pokemonId: 25 },
    });
  });

  it("returns an idempotent result when the user's favorite does not exist", async () => {
    const caller = createTestCaller("user-1");
    mocks.deleteMany.mockResolvedValue({ count: 0 });

    await expect(caller.remove({ pokemonId: 999 })).resolves.toEqual({
      removed: false,
    });
  });

  it("rejects invalid favorite metadata", async () => {
    const caller = createTestCaller("user-1");

    await expect(
      caller.add({ pokemonId: 0, name: "", image: null }),
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(mocks.upsert).not.toHaveBeenCalled();
  });

  it("propagates database failures", async () => {
    const caller = createTestCaller("user-1");
    mocks.findMany.mockRejectedValue(new Error("Database unavailable"));

    await expect(caller.list()).rejects.toThrow("Database unavailable");
  });
});
