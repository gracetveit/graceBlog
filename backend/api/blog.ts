import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();
import { Post } from '@prisma/client';

import prisma from '../prisma/client';
import { validate } from './auth';

/**
 * GET ALL blog posts
 */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogs: Post[] = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.send(blogs);
  } catch (error) {
    next(error);
  }
};

/**
 * Get Single Blog from a slug
 *
 * **Request Params**
 * - slug: slugified string
 */
const getFromSlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await prisma.post.findUnique({
      where: { slug: req.params.slug },
    });
    res.send(blog);
  } catch (error) {
    next(error);
  }
};

/**
 * Get most recent blog post
 */
const getMostRecent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await prisma.post.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (blog) {
      res.send(blog);
    } else {
      throw new Error('No Blog');
    }
  } catch (error) {
    next(error);
  }
};
// POST
const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog: Partial<Post> = req.body;
    await prisma.post.create({
      data: {
        title: blog.title!,
        content: blog.content!,
        slug: encodeURI(blog.title!),
      },
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
// PUT
const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const blog: Post = req.body;
    await prisma.post.update({ where: { id }, data: blog });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
// DELETE
const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.post.delete({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

router.get('/', getAll);
router.get('/most-recent', getMostRecent);
router.get('/:slug', getFromSlug);

router.post('/blog', validate, createBlog);
router.put('/blog/:id', validate, createBlog);
router.delete('/blog/:id', validate, deleteBlog);

export default router;
