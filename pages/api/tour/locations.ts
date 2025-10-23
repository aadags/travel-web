import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import Response from '@/models/response'
import NextCors from 'nextjs-cors';
const prisma = new PrismaClient();


export default async function widget (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {

  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: ['https://account.travelpally.com', 'http://localhost:3000'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method === 'GET') {

    try {

      const q = req.query
      const qs: any = q.search

      var tours = await prisma.tour.findMany({
        where: {
          OR: [
            {
              city: {
                contains: qs,
                mode: 'insensitive',
              },
            }, {
              country: {
                contains: qs,
                mode: 'insensitive',
              }
            },
          ],
        },
        distinct: ['city', 'country'],
      });

      await prisma.$disconnect();
      
      res.status(200).json(new Response(200, true, 'Success', tours))

    } catch (err) {
      console.log(err)
      res.status(500).json({ code: 500, status: false, message: 'Failed to fecth data' })
    }

  } else {

    res.status(405).json({ code: 405, status: false, message: 'Method not allowed' })

  }

}
