import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client';

/**
 * Helper function that finds user in userbase
 * @param req
 * @returns A user if any, sends a 404 status if none found
 */
async function findUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name } = req.query;
    const user = await prisma.author.findFirst({
      where: {
        name: {
          contains: name as string,
          mode: 'insensitive',
        },
      },
    });
    return user;
  } catch (error) {
    res.status(404).send('Invalid Author Name');
  }
}

/**
 * PUT handler
 * @param req
 * @param res
 */
async function put(user, req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log(user);
    const updatedUser = await prisma.author.update({
      where: {
        name: user.name,
      },
      data: req.body.author,
    });
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function requestHandler(req: NextApiRequest, res: NextApiResponse) {
  const user = await findUser(req, res);
  switch (req.method) {
    case 'PUT':
      put(user, req, res);
      break;
    default:
      res.status(405).send({ error: 'Method not Allowed' });
  }
}

export default requestHandler;
