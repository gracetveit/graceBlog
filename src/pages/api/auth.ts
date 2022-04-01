import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
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

    const token = jwt.sign(
      { username, pwHash: user.pwHash, loginDate: Date.now() },
      process.env.SECRET
    );
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

const logout = async (res: NextApiResponse) => {
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

export const verify = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextApiHandler
) => {
  try {
    const { authorization } = req.headers;
    if (authorization === "undefined") {
      throw new Error("No Token");
    }
    // const authorization = req.getHeader("authorization");
    const user = await db.user.findFirst();
    jwt.verify(authorization, process.env.SECRET);
    if (user.token !== authorization) {
      throw new Error("Unverified");
    }
    next(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const verifyRoute = (req: NextApiRequest, res: NextApiResponse) => {
  res.json(true);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await verify(req, res, verifyRoute);
      break;
    case "POST":
      await login(req, res);
      break;
    case "DELETE":
      await logout(res);
      break;
    default:
      res.status(405).end();
  }
};
