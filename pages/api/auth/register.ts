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
    origin: 'https://account.travelpally.com',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method === 'POST') {

    try {

      const user = await prisma.user.create({
        data: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          mobile_number: req.body.mobile_number,
          email: req.body.email,
          password: md5(req.body.password),
        }
      });

      await prisma.$disconnect();
      
      res.status(200).json({ code: 200, status: true, message: 'Registration successful' })

    } catch (err) {
      console.log(err)
      res.status(500).json({ code: 500, status: false, message: 'Registration failed' })
    }

  } else {

    res.status(405).json({ code: 405, status: false, message: 'Method not allowed' })

  }

}
