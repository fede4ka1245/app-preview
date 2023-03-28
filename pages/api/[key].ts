import {NextApiRequest, NextApiResponse} from "next";
import { PrismaClient } from '@prisma/client'
import NextCors from "nextjs-cors";

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  if (req.method === "GET") {
    const { key } = req.query;

    const link = await prisma.link.findFirst({
      where: {
        key: key as string
      }
    });

    if (!link) {
      res.status(403).send('validation error');
      return;
    }

    res.redirect(link.link);
    return;
  }

  res.status(405).send('method not found');
}