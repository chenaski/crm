import { FastifyInstance } from "fastify";

import { AUTH_COOKIE } from "~/constants";

import { ErrorSchema } from "~/dto/error";
import { SignUpInput, SignUpInputSchema } from "~/dto/sign-up-input";
import { SignUpReply, SignUpReplySchema } from "~/dto/sign-up-reply";

import { userStore } from "~/stores/UserStore";

import { cookieProcessor } from "~/helpers/CookieProcessor";

export async function signUpRoutes(server: FastifyInstance) {
  server.post<{ Body: SignUpInput; Reply: SignUpReply | Error }>(
    "/sign-up",
    {
      schema: {
        body: SignUpInputSchema,
        response: {
          200: SignUpReplySchema,
          401: ErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { firstName, lastName, email, password } = request.body;

      await userStore.init();

      const createdUser = await userStore.create({
        firstName,
        lastName,
        email,
        password,
      });
      const userWithoutPassword = { ...createdUser, password: undefined };

      reply.cookie(AUTH_COOKIE, userWithoutPassword.id, cookieProcessor.getAuthCookieOptions());

      return { user: userWithoutPassword };
    }
  );
}
