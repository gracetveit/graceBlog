import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client';

/**
 * Request Handler
 */
async function requestHandler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await getAll(req, res);
      break;
    case 'POST':
      await post(req, res);
      break;
    default:
      res.status(405).send({ error: 'Method Not Allowed' });
  }
}

/**
 * GET Request
 */
async function getAll(req: NextApiRequest, res: NextApiResponse) {
  const authors = await prisma.author.findMany();
  res.send(authors);
}

/**
 * POST Request
 */
async function post(req: NextApiRequest, res: NextApiResponse) {
  const author = req.body;
  if (!author) {
    throw new Error('No author found');
  }
  try {
    const createdAuthor = await prisma.author.create({ data: author });
    res.status(201).send(createdAuthor);
  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log(error.message);
  }
}

export default requestHandler;
