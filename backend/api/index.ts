import express from 'express';
import blogRouter from './blog';

const router = express.Router();

router.use('/blog', blogRouter);

export default router;
