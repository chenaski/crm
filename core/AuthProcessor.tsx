import { AUTH_COOKIE } from "./constants";
import { User } from "../global";
import { userStore } from "./UserStore";
import { GetServerSidePropsContext } from "next/types";

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
