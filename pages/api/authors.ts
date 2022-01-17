import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/client';

/**
 * Request Handler
 */
async function requestHandler (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      getAll(req, res)
      break;
    default:
      res.status(405).send({error: 'Method Not Allowed'})
  }
}

/**
 * GET Request
 */
async function getAll (req: NextApiRequest, res: NextApiResponse) {
  const authors = await prisma.author.findMany();
  res.send(authors);
};

/**
 * PUT Request
 */
// export default async (req: NextApiRequest, res: NextApiResponse) => {
  
// }

export default requestHandler