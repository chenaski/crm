import { GetServerSidePropsContext } from "next/types";

import { User } from "~/global";

import { AUTH_COOKIE } from "~/core/constants";
import { userStore } from "~/core/UserStore";

export class AuthProcessor {
  static getUserIdFromRequest(req: GetServerSidePropsContext["req"]): string | undefined {
    return req.cookies[AUTH_COOKIE];
  }

  static async getUserById(id: string): Promise<User | undefined> {
    if (id) {
      await userStore.init();
      return await userStore.findOneById(id);
    }
  }
}

export const authProcessor = new AuthProcessor();
