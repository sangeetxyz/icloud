import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { photos } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";

export const photosRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        link: z.string(),
        size: z.number(),
        type: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(photos).values({
        type: input.type,
        name: input.name,
        link: input.link,
        size: input.size,
        createdById: ctx.session.user.id,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        link: z.string(),
        size: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(photos)
        .set({
          name: input.name,
          link: input.link,
          size: input.size,
        })
        .where(sql`${input.id} = ${photos.id}`);
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(photos).where(sql`${input.id} = ${photos.id}`);
    }),

  getPhotosByUser: protectedProcedure.query(async ({ ctx }) => {
    const notesByUser = await ctx.db.query.photos.findMany({
      where: eq(photos.createdById, ctx.session.user.id),
      orderBy: (photos, { desc }) => [desc(photos.createdAt)],
    });

    return notesByUser;
  }),
});
