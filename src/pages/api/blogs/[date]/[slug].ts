import { PrismaClient } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const db = new PrismaClient();

const getSingle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { date, slug } = req.query;
    [date, slug] = [date as string, slug as string];
    const gte = new Date(date);
    const lt = new Date(date);
    lt.setDate(gte.getDate() + 1);
    const blog = await db.blog.findFirst({
      where: {
        createdAt: {
          gte,
          lt,
        },
        slug,
      },
      rejectOnNotFound: true,
    });
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(404).json({ status: 404, error: error });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await getSingle(req, res);
    default:
      res.status(405);
  }
};
