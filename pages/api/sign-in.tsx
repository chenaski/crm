import { NextApiRequest, NextApiResponse } from "next";

import { User } from "~/global";

import { AUTH_COOKIE } from "~/core/constants";
import { cookieProcessor } from "~/core/helpers/CookieProcessor";
import { userStore } from "~/core/UserStore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ user: User } | { error: { message: string } }>
) {
  console.log(`\n${req.method} ${req.url}\n`, req.body);

  await userStore.init();

  const { email, password } = req.body;
  const user = await userStore.findOneByEmail(email);

  if (!user) {
    res.status(401).json({ error: { message: "User not found" } });
    return;
  } else if (user.password !== password) {
    res.status(401).json({ error: { message: "Wrong password" } });
    return;
  }

  const userWithoutPassword = { ...user, password: undefined };

  res
    .status(200)
    .setHeader(
      "Set-Cookie",
      cookieProcessor.getSetCookieHeader(AUTH_COOKIE, user.id, cookieProcessor.getSessionCookieExpirationDate())
    )
    .json({ user: userWithoutPassword });
}
