import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import path from 'path';

import apiRoutes from './api';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const url = process.env.server || 'localhost';
const publicPath = path.join(process.cwd(), '../public');

app.use(express.json());
app.use(express.static(publicPath));

app.use('/api', apiRoutes);
app.use('/', async (req: Request, res: Response) => {
  res.sendFile(`${publicPath}/index.html`);
});

app.listen(port, () => {
  console.log(`blog now listening at http://${url}:${port}`);
});
