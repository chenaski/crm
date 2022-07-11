import { GetServerSidePropsContext } from "next/types";

import { AUTH_COOKIE } from "~/server/constants";

export class AuthProcessor {
  static getUserIdFromRequest(req: GetServerSidePropsContext["req"]): string | undefined {
    return req.cookies[AUTH_COOKIE];
  }

  static buildAuthCookie(userId: string): string {
    return `${AUTH_COOKIE}=${userId}`;
  }
}

export const authProcessor = new AuthProcessor();
