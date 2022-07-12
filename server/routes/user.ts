import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";

import { AUTH_COOKIE } from "~/constants";

import { ServerError, ServerErrorSchema } from "~/dto/server-error";
import { UserReply, UserReplySchema } from "~/dto/user-reply";

import { userStore } from "~/stores/UserStore";

import { cookieProcessor } from "~/helpers/CookieProcessor";

const ParamsSchema = Type.Object({ id: Type.String() });
type Params = Static<typeof ParamsSchema>;

export async function userRoutes(server: FastifyInstance) {
  server.get<{ Reply: UserReply | ServerError; Params: Params }>(
    "/user/:id",
    {
      schema: {
        params: ParamsSchema,
        response: {
          200: UserReplySchema,
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

      const { id } = request.params;
      const user = await userStore.findOneById(id);

      if (!user) {
        reply.status(401);
        return { error: { message: "User not found." } };
      }

      const userWithoutPassword = { ...user, password: undefined };

      reply.cookie(AUTH_COOKIE, userWithoutPassword.id, cookieProcessor.getAuthCookieOptions());

      return { user: userWithoutPassword };
    }
  );
}
