import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import dotenv from 'dotenv';

export async function POST({ request }) {
   dotenv.config();
   let data = await request.json();
   const salt = crypto.randomBytes(16).toString("hex");
   const cryptedPassword = crypto.scryptSync(data.password, salt, 32).toString('hex');

   data.password = salt + ':' + cryptedPassword;
   const token = jwt.sign(
      data,
      process.env.JWT_SECRET,
      {
         expiresIn: '2m'
      }
   );

   // console.log('SECRET', process.env.JWT_SECRET);
   // console.log('DATA', data);
   // console.log('TOKEN', token);
   console.log('Token generated');
   return new Response(JSON.stringify({ token }))
}
