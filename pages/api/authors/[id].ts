import { Author } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client';

/**
 * Helper function that finds user in userbase
 * @param req
 * @returns A user if any, sends a 404 status if none found
 */
async function findUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const user = await prisma.author.findFirst({
      where: {
        id: id as string,
      },
    });
    if (!user) throw new Error('Author not found');

    return user;
  } catch (error) {
    res.status(404).send('Invalid Author Name');
  }
}

/**
 * GET handler
 * @param author
 * @param req
 * @param res
 */
async function get(author: Author, res: NextApiResponse) {
  res.send(author);
}

/**
 * PUT handler
 * @param author
 * @param req
 * @param res
 */
async function put(author: Author, req: NextApiRequest, res: NextApiResponse) {
  try {
    const updatedUser = await prisma.author.update({
      where: {
        name: author.name,
      },
      data: req.body,
    });
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send({ error: error.message });
    console.error(error);
  }
}

async function requestHandler(req: NextApiRequest, res: NextApiResponse) {
  const author = await findUser(req, res);
  switch (req.method) {
    case 'GET':
      await get(author, res);
      break;
    case 'PUT':
      await put(author, req, res);
      break;
    default:
      res.status(405).send({ error: 'Method not Allowed' });
  }
}

export default requestHandler;
