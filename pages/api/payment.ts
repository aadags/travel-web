import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import Response from '@/models/response'

const prisma = new PrismaClient();


export default async function createBooking(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {

  if (req.method === 'POST') {

    try {

      const trip = await prisma.trip.create({
        data: req.body,
      });

      await prisma.$disconnect();
      
      res.status(200).json(new Response(200, true, 'Success', trip))

    } catch (err) {
      console.log(err)
      res.status(500).json({ code: 500, status: false, message: 'Failed to load data' })
    }

  } else {

    res.status(405).json({ code: 405, status: false, message: 'Method not allowed' })

  }

}
