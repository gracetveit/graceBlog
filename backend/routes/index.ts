import express, { Request, Response } from 'express';
import path from 'path';

import apiRouter from './api';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.use('/api', apiRouter);

export default router;
