import { PrismaClient } from ".prisma/client";
import { Verified } from "@mui/icons-material";
import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "../../auth";

const db = new PrismaClient();

type BlogParams = {
  slug: string;
  gte: Date;
  lt: Date;
};

const getParams = (req: NextApiRequest, res: NextApiResponse): BlogParams => {
  try {
    let { date, slug } = req.query;
    [date, slug] = [date as string, slug as string];
    const gte = new Date(date);
    const lt = new Date(date);
    lt.setDate(gte.getDate() + 1);
    return { slug, gte, lt };
  } catch (error) {
    res.status(500).json({ status: 404, error });
  }
};

const getSingle = async (
  { gte, lt, slug }: BlogParams,
  res: NextApiResponse
) => {
  try {
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

const deleteBlog = async (
  { gte, lt, slug }: BlogParams,
  res: NextApiResponse
) => {
  try {
    await db.blog.deleteMany({
      where: {
        createdAt: {
          gte,
          lt,
        },
        slug,
      },
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(error.status).json({ status: error.status, error: error });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const blogParams = getParams(req, res);
  switch (req.method) {
    case "GET":
      await getSingle(blogParams, res);
      break;
    case "DELETE":
      const verified = await verify(req, res);
      if (verified) {
        await deleteBlog(blogParams, res);
      }
      break;
    default:
      res.status(405).end();
  }
};
