import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from ".prisma/client";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config";

const db = new PrismaClient();

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;
  try {
    const user = await db.user.findUnique({
      where: { username },
      rejectOnNotFound: true,
    });

    if (!(await argon2.verify(user.pwHash, password))) {
      throw new Error("Incorrect Password");
    }

    const token = jwt.sign(user, process.env.SECRET);
    await db.user.update({
      where: { username },
      data: { token },
    });
    res.json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.user.updateMany({
      data: {
        token: null,
      },
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await login(req, res);
    case "DELETE":
      await logout(req, res);
    default:
      res.status(405).end();
  }
};
