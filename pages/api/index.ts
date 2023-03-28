import {NextApiRequest, NextApiResponse} from "next";
import { PrismaClient } from '@prisma/client'
import * as crypto from "crypto";
import NextCors from "nextjs-cors";

function createHash(data: string, len: number) {
  return crypto.createHash("shake256", { outputLength: len })
    .update(data)
    .digest("hex");
}

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });


  if (req.method === "POST") {
    const { link } = req.body;

    if (!link || typeof link !== 'string') {
      res.status(403).send('Validation error');
      return;
    }

    const key = createHash(link, 6);

    const target = await prisma.link.findFirst({
      where: {
        key,
        link
      },
    })

    if (target) {
      res.json({
        shortLink: `${process.env.BASE_URL}/api/${key}`,
        ...target
      });
      return;
    }

    const newLink = await prisma.link.create({
      data: {
        link,
        key
      }
    });

    res.status(200).json({
      shortLink: `${process.env.BASE_URL}/api/${key}`,
      ...newLink
    });
    return;
  }

  res.status(405).send('Method not found');
}