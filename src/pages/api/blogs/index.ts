import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from ".prisma/client";

const db = new PrismaClient();

const getAll = async (res: NextApiResponse) => {
  const blogs = await db.blog.findMany();
  res.status(200).json(blogs);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await getAll(res);
    default:
      res.status(405);
  }
};
