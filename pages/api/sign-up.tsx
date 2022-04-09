import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../global";

export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
  const { randomUUID } = await import("crypto");

  console.log(`${req.method} ${req.url}\n`, req.body);
  res.status(200).json({
    id: randomUUID(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}
