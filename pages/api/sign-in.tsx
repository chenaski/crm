import { NextApiRequest, NextApiResponse } from "next";
import { userStore } from "../../core/UserStore";
import { User } from "../../global";

export default async function handler(req: NextApiRequest, res: NextApiResponse<User | { message: string }>) {
  console.log(`${req.method} ${req.url}\n`, req.body);

  await userStore.init();

  const { email, password } = req.body;
  const user = await userStore.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "User not found" });
    return;
  } else if (user.password !== password) {
    res.status(401).json({ message: "Wrong password" });
    return;
  }

  const userWithoutPassword = { ...user, password: undefined };

  res.status(200).json(user);
}
