import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { drives } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";

export const drivesRouter = createTRPCRouter({
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
      await ctx.db.insert(drives).values({
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
        .update(drives)
        .set({
          name: input.name,
          link: input.link,
          size: input.size,
        })
        .where(sql`${input.id} = ${drives.id}`);
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(drives).where(sql`${input.id} = ${drives.id}`);
    }),

  getDrivesByUser: protectedProcedure.query(async ({ ctx }) => {
    const notesByUser = await ctx.db.query.drives.findMany({
      where: eq(drives.createdById, ctx.session.user.id),
      orderBy: (drives, { desc }) => [desc(drives.createdAt)],
    });

    return notesByUser;
  }),
});
