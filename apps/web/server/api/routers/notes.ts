import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { posts, notes } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";

export const notesRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(notes).values({
        title: input.title,
        description: input.description,
        createdById: ctx.session.user.id,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(notes)
        .set({
          title: input.title,
          description: input.description,
        })
        .where(sql`${input.id} = ${notes.id}`);
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(notes).where(sql`${input.id} = ${notes.id}`);
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return post ?? null;
  }),

  getNotesByUser: protectedProcedure.query(async ({ ctx }) => {
    const notesByUser = await ctx.db.query.notes.findMany({
      where: eq(notes.createdById, ctx.session.user.id),
      orderBy: (notes, { desc }) => [desc(notes.createdAt)],
    });

    return notesByUser;
  }),
});
