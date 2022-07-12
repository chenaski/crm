import fastifyCookiePlugin from "@fastify/cookie";
import fastifyCorsPlugin from "@fastify/cors";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";

import { signInRoutes } from "~/routes/sign-in";
import { signOutRoutes } from "~/routes/sign-out";
import { signUpRoutes } from "~/routes/sign-up";
import { userRoutes } from "~/routes/user";

const server = fastify({
  ajv: {
    customOptions: {
      strict: "log",
      keywords: ["kind", "modifier"],
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(fastifyCorsPlugin, { origin: true, credentials: true });
server.register(fastifyCookiePlugin);

server.register(signInRoutes);
server.register(signUpRoutes);
server.register(signOutRoutes);
server.register(userRoutes);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
