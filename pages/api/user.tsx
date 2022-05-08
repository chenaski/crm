import { NextApiRequest, NextApiResponse } from "next";

import { AUTH_COOKIE } from "../../core/constants";
import { cookieProcessor } from "../../core/helpers/CookieProcessor";
import { userStore } from "../../core/UserStore";
import { User } from "../../global";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { error: { message: string } }>
) {
  console.log(`\n${req.method} ${req.url}\n`, req.body);

  await userStore.init();

  const { id } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const user = await userStore.findOneById(id);

  if (!user) {
    res.status(401).json({ error: { message: "User not found" } });
    return;
  }

  const userWithoutPassword = { ...user, password: undefined };

  res
    .status(200)
    .setHeader(
      "Set-Cookie",
      cookieProcessor.getSetCookieHeader(AUTH_COOKIE, user.id, cookieProcessor.getSessionCookieExpirationDate())
    )
    .json(userWithoutPassword);
}
