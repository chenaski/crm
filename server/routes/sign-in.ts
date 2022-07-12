import { FastifyInstance } from "fastify";

import { AUTH_COOKIE } from "~/constants";

import { ServerError, ServerErrorSchema } from "~/dto/server-error";
import { SignInInput, SignInInputSchema } from "~/dto/sign-in-input";
import { SignInReply, SignInReplySchema } from "~/dto/sign-in-reply";

import { userStore } from "~/stores/UserStore";

import { cookieProcessor } from "~/helpers/CookieProcessor";

export async function signInRoutes(server: FastifyInstance) {
  server.post<{ Body: SignInInput; Reply: SignInReply | ServerError }>(
    "/sign-in",
    {
      schema: {
        body: SignInInputSchema,
        response: {
          200: SignInReplySchema,
          401: ServerErrorSchema,
        },
      },
    },
    async (request, reply) => {
      await userStore.init();

      const { email, password } = request.body;
      const user = await userStore.findOneByEmail(email);

      if (!user) {
        reply.status(401);
        return { error: { message: "User not found." } };
      } else if (user.password !== password) {
        reply.status(401);
        return { error: { message: "Wrong password." } };
      }

      const userWithoutPassword = { ...user, password: undefined };

      reply.cookie(AUTH_COOKIE, userWithoutPassword.id, cookieProcessor.getAuthCookieOptions());

      return {
        user: userWithoutPassword,
      };
    }
  );
}
