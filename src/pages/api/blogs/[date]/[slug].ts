import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "../../auth";
import db from "../../../../prisma/client";
import { Blog } from ".prisma/client";

const getParams = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Blog> => {
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
    return blog;
  } catch (error) {
    res.status(500).json({ status: 404, error });
  }
};

const getSingle = (blog: Blog, res: NextApiResponse) => {
  res.json(blog);
};

const deleteBlog = async ({ createdAt, slug }: Blog, res: NextApiResponse) => {
  try {
    await db.blog.delete({
      where: {
        slug_createdAt: {
          createdAt,
          slug,
        },
      },
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(error.status).json({ status: error.status, error: error });
  }
};

const updateBlog = async (
  // For some reason this throws an error (despite using the same pattern as
  // delete, which does *not* throw an error), but it otherwise works as intended
  { slug, createdAt }: Blog,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const newBlog: Blog = req.body;
    const updatedBlog = await db.blog.update({
      where: {
        slug_createdAt: {
          createdAt,
          slug,
        },
      },
      data: newBlog,
    });
    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(error.status).json({ status: error.status, error: error });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const blog = await getParams(req, res);
  let verified: boolean;
  switch (req.method) {
    case "GET":
      await getSingle(blog, res);
      break;
    case "DELETE":
      verified = await verify(req, res);
      if (verified) {
        await deleteBlog(blog, res);
      }
      break;
    case "PUT":
      verified = await verify(req, res);
      if (verified) {
        await updateBlog(blog, req, res);
      }
      break;
    default:
      res.status(405).end();
  }
};
