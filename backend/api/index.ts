import express from 'express';
import { generateToken } from './auth';
import blogRouter from './blog';

const router = express.Router();

router.use('/blogs', blogRouter);
router.use('/login', generateToken);

export default router;
