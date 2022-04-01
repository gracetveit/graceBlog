import { NextApiRequest, NextApiResponse } from "next";
import { Blog, PrismaClient } from ".prisma/client";
import { verify } from "../auth";

const db = new PrismaClient();

const getAll = async (res: NextApiResponse) => {
  const blogs = await db.blog.findMany();
  res.status(200).json(blogs);
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const blog: Blog = req.body;
    const createdBlog = await db.blog.create({ data: blog });
    res.json(createdBlog);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await getAll(res);
      break;
    case "POST":
      verify(req, res, create);
      break;
    default:
      res.status(405).end();
  }
};
