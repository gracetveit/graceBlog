import { NextApiRequest, NextApiResponse } from "next";
import { Blog } from ".prisma/client";
import db from "../../../prisma/client";
import { verify } from "../auth";
import slugify from "slugify";


const getAll = async (res: NextApiResponse) => {
  const blogs = await db.blog.findMany({ orderBy: { createdAt: "desc" } });
  res.status(200).json(blogs);
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const blog: Blog = req.body;
    const createdBlog = await db.blog.create({
      data: { ...blog, slug: slugify(blog.title) },
    });
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
      const verified = await verify(req, res);
      if (verified) {
        await create(req, res);
      }
      break;
    default:
      res.status(405).end();
  }
};
