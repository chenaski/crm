import { CookieSerializeOptions } from "@fastify/cookie";

import { AUTH_COOKIE_EXPIRATION } from "~/constants";

export class CookieProcessor {
  getAuthCookieOptions(deletion?: boolean): CookieSerializeOptions {
    return {
      path: "/",
      expires: deletion ? new Date() : new Date(Date.now() + AUTH_COOKIE_EXPIRATION),
      httpOnly: true,
    };
  }
}

export const cookieProcessor = new CookieProcessor();
