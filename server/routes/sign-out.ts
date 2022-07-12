import { Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";

import { AUTH_COOKIE } from "~/constants";

import { ServerError, ServerErrorSchema } from "~/dto/server-error";

import { userStore } from "~/stores/UserStore";

import { cookieProcessor } from "~/helpers/CookieProcessor";

export async function signOutRoutes(server: FastifyInstance) {
  server.get<{ Reply: boolean | ServerError }>(
    "/sign-out",
    {
      schema: {
        response: {
          200: Type.Boolean(),
          401: ServerErrorSchema,
        },
      },
    },
    async (request, reply) => {
      await userStore.init();

      const { uid } = request.cookies;

      if (!uid) {
        reply.status(401);
        return { error: { message: "Non-authorized." } };
      }

      const user = await userStore.findOneById(uid);

      if (!user) {
        reply.status(401);
        return { error: { message: "User not found." } };
      }

      reply.cookie(AUTH_COOKIE, user.id, cookieProcessor.getAuthCookieOptions(true));

      return true;
    }
  );
}
