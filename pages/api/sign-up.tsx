import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../global";
import { userStore } from "../../core/UserStore";

export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
  console.log(`${req.method} ${req.url}\n`, req.body);

  await userStore.init();

  const createdUser = await userStore.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  const userWithoutPassword = { ...createdUser, password: undefined };

  res.status(200).json(userWithoutPassword);
}
