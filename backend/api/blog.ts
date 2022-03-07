import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  console.log('hello world');
  res.send('Hello World!');
});

export default router;
