import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

/**
 * GET Request
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const authors = await prisma.author.findMany();
  res.send(authors)
}