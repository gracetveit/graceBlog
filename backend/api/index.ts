import express from 'express';
import blogRouter from './blog';

const router = express.Router();

router.use('/blogs', blogRouter);

export default router;
