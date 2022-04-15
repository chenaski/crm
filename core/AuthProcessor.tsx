import { GetServerSidePropsContext } from "next/types";

import { User } from "../global";

import { AUTH_COOKIE } from "./constants";
import { userStore } from "./UserStore";

export class AuthProcessor {
  async getUserFromRequest(req: GetServerSidePropsContext["req"]): Promise<User | undefined> {
    const userId = req.cookies[AUTH_COOKIE];

    if (userId) {
      await userStore.init();
      return await userStore.findOneById(userId);
    }
  }
}

export const authProcessor = new AuthProcessor();
