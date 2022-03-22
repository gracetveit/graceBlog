import express from 'express';
import { generateToken, resetPassword, upsert } from './auth';
import blogRouter from './blog';

const router = express.Router();

router.use('/blogs', blogRouter);
router.use('/login', generateToken);
router.get('/resetPassword', resetPassword);
router.post('/resetPassword', upsert);

export default router;
