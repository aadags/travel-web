import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import Response from '@/models/response'

const prisma = new PrismaClient();


export default async function getTrip(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {

  if (req.method === 'POST') {

    try {

      if(!req.body.booking_number || req.body.booking_number == '')
      {
         res.status(400).json({ code: 400, status: false, message: 'Booking number is required' })
      }

      if(!req.body.last_name || req.body.last_name == '')
      {
         res.status(400).json({ code: 400, status: false, message: 'Last name is required' })
      }

      const bn: string = req.body.booking_number
      const ln: string = req.body.last_name

      const trip = await prisma.trip.findFirst({
        where: {
          reference: bn
        },
        include: {
          passengers: true
        }
      });

      const passengers = await prisma.passenger.count({
        where: {
          trip_id: trip?.id,
          last_name: ln 
        }
      });

      await prisma.$disconnect();
      
      if(passengers < 1)
      {
         res.status(404).json({ code: 404, status: false, message: 'Trip not found' })
      }
      
      res.status(200).json(new Response(200, true, 'Success', trip))

    } catch (err) {
      console.log(err)
      res.status(500).json({ code: 500, status: false, message: 'Failed to load data' })
    }

  } else {

    res.status(405).json({ code: 405, status: false, message: 'Method not allowed' })

  }

}
