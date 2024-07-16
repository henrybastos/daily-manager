import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import dotenv from 'dotenv';

export async function POST({ request }) {
   const authHeader = request.headers.get('authorization');
   const auth = authHeader?.split(' ')?.[1];

   if (!authHeader) {
      return new Response(JSON.stringify({ 
         error: 'No authorization header provided.',
         err_code: 'header_unauthorized'
      }, { status: 401 }));
   }
   
   if (!auth) {
      return new Response(JSON.stringify({ 
         error: 'Authorization token not provided.',
         err_code: 'header_unauthorized'
      }, { status: 401 }));
   }

   console.log('ACCESS TOKEN', auth);
   dotenv.config();

   if (!process.env.JWT_SECRET) {
      return new Response(JSON.stringify({ 
         error: 'No JWT Secret provided.',
         err_code: 'no_jwt_token'
      }, { status: 401 }));
   }

   let jwtData;
   
   try {
      jwtData = jwt.verify(auth, process.env.JWT_SECRET);
   } catch (err) {
      if (err.message == 'jwt expired') {
         return new Response(JSON.stringify({ 
            error: '[JWT ERROR] The token has expired',
            err_code: 'jwt_expired'
         }), { status: 401 });
      } else {
         console.log('JWT ERROR', err);
         return new Response(JSON.stringify({ error: {
            kind: '[JWT ERROR]',
            info: err
         } }));   
      }
   }

   console.log('JWT DATA', jwtData);
   const data = await request.json();

   if (!data.password) {
      return new Response(JSON.stringify({ 
         error: 'No password provided.',
         err_code: 'no_password'
      }), { status: 401 });
   }

   const [salt, password] = jwtData.password.split(':');
   const cryptedPassword = crypto.scryptSync(data.password, salt, 32).toString('hex');

   if (cryptedPassword !== password) {
      return new Response(JSON.stringify({ 
         error: 'Unauthorized access',
         err_code: 'unauthorized'
      }), { status: 401 });   
   }

   console.log('DATA', data);
   return new Response(JSON.stringify({ success: 'Hello, world!' }), { status: 200 });
}