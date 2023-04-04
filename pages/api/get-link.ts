import {NextApiRequest, NextApiResponse} from "next";
import { PrismaClient } from '@prisma/client'
import NextCors from "nextjs-cors";

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'OPTIONS', 'PATCH', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const { key } = req.body;

  const link = await prisma.link.findFirst({
    where: {
      key: key as string
    }
  });

  if (!link) {
    res.status(404).send('not found');
    return;
  }

  res.status(200).json(link);
}