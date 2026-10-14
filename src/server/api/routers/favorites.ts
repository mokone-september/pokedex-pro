import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const favoriteInput = z.object({
  pokemonId: z.number().int().positive(),
  name: z.string().trim().min(1).max(100),
  image: z.string().max(2048).nullable(),
});

const pokemonIdInput = z.object({
  pokemonId: z.number().int().positive(),
});

export const favoritesRouter = createTRPCRouter({
  list: protectedProcedure.query(({ ctx }) =>
    ctx.db.favorite.findMany({
      where: { userId: ctx.session.user.id },
      select: {
        pokemonId: true,
        name: true,
        image: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  ),

  add: protectedProcedure
    .input(favoriteInput)
    .mutation(({ ctx, input }) =>
      ctx.db.favorite.upsert({
        where: {
          userId_pokemonId: {
            userId: ctx.session.user.id,
            pokemonId: input.pokemonId,
          },
        },
        create: {
          userId: ctx.session.user.id,
          pokemonId: input.pokemonId,
          name: input.name,
          image: input.image,
        },
        update: {
          name: input.name,
          image: input.image,
        },
        select: {
          pokemonId: true,
          name: true,
          image: true,
        },
      }),
    ),

  remove: protectedProcedure
    .input(pokemonIdInput)
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.favorite.deleteMany({
        where: {
          userId: ctx.session.user.id,
          pokemonId: input.pokemonId,
        },
      });

      return { removed: result.count > 0 };
    }),
});
