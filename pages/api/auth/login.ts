import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import Response from '@/models/response'
import NextCors from 'nextjs-cors';
var md5 = require('md5');

const prisma = new PrismaClient();


export default async function login (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {

  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: ['https://account.travelpally.com', 'http://localhost:3000'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method === 'POST') {

    try {

      const user = await prisma.user.findFirst({
        where: {
          email: req.body.email,
          password: md5(req.body.password),
        }
      });

      await prisma.$disconnect();

      if(!user) {
        res.status(404).json({ code: 404, status: false, message: 'Invalid Login or Credentials' })
      }
      
      res.status(200).json(new Response(200, true, 'Success', {
        first_name: user?.first_name,
        last_name: user?.last_name,
        mobile_number: user?.mobile_number,
        email: user?.email,
    }))

    } catch (err) {
      console.log(err)
      res.status(500).json({ code: 500, status: false, message: 'Login failed' })
    }

  } else {

    res.status(405).json({ code: 405, status: false, message: 'Method not allowed' })

  }

}
