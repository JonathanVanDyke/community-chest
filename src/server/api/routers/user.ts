import { z } from "zod";
import bcrypt from 'bcrypt';

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ email: z.string().min(1), password: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {

      const encryptedPassword = bcrypt.hashSync(input.password, 10)
      return ctx.db.user.create({
        data: {
          email: input.email,
          password: encryptedPassword,
        },
      });
    }),
});
