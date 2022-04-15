import type { NextApiRequest, NextApiResponse } from "next";

import { AUTH_COOKIE } from "../../core/constants";
import { cookieProcessor } from "../../core/CookieProcessor";
import { userStore } from "../../core/UserStore";
import { User } from "../../global";

export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
  console.log(`\n${req.method} ${req.url}\n`, req.body);

  await userStore.init();

  const createdUser = await userStore.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  const userWithoutPassword = { ...createdUser, password: undefined };

  res
    .status(200)
    .setHeader(
      "Set-Cookie",
      cookieProcessor.getSetCookieHeader(AUTH_COOKIE, createdUser.id, cookieProcessor.getSessionCookieExpirationDate())
    )
    .json(userWithoutPassword);
}
