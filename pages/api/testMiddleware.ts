import prisma from '../../prisma/client';
import { NextApiRequest } from 'next';
import { prismaMock } from '../../singleton';

export type db = typeof prismaMock | typeof prisma;

export default function testMiddleware(req: NextApiRequest): db {
  if (req.headers.test) {
    return prismaMock;
  } else {
    return prisma;
  }
}
