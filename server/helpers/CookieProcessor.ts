import { CookieSerializeOptions } from "@fastify/cookie";

import { AUTH_COOKIE_EXPIRATION } from "~/constants";

export class CookieProcessor {
  getAuthCookieOptions(): CookieSerializeOptions {
    return {
      path: "/",
      expires: new Date(Date.now() + AUTH_COOKIE_EXPIRATION),
      httpOnly: true,
    };
  }
}

export const cookieProcessor = new CookieProcessor();
