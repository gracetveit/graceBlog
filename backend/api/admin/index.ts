import { Post } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import { validate } from './auth';
import prisma from '../../prisma/client';

const router = express.Router();

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

router.use('*', validate);
router.post('/blog', createBlog);
router.put('/blog/:id', updateBlog);

export default router;
