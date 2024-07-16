export async function load({ fetch, cookies }) {
   // let jwtCookie = cookies.get('jwt_token');

   // if (!jwtCookie) {
   //    // const JWTToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGVucnkgQmFzdG9zIGRhIFNpbHZhIiwicGFzc3dvcmQiOiI4ZWUwYTBhZjcwMGIwNDQ5MGYyZTM4ZDY5ZWYzNDdkYzpmNjZiZTcyYTc4NDZmODFmZDA3ODFiNTY4MTNhMGNiMWM3NDdlOWU4NWIyOGVhYzY0NGZhYzk3YTc3YjE5MGU3IiwiaWF0IjoxNzIxMTM3OTY4LCJleHAiOjE3MjExMzgwODh9.COSfFo_3hRIbOOaTz8YolUcgsYgq3K5lJFVJTtQCcR4';
      
   //    const response = await fetch('/api/gen-token', {
   //       method: 'POST',
   //       body: JSON.stringify({
   //          username: 'henrybsilva',
   //          password: 'fFLj%TQx*Z4XsR'
   //       })
   //    })
   
   //    const { token } = await response.json();
   //    jwtCookie = token
   //    cookies.set('jwt_token', token, { path: '/finance', secure: true, httpOnly: true });
   //    console.log('JWT TOKEN GENERATED', token);
   // }

   // const authResponse = await fetch('/api/auth', {
   //    method: 'POST',
   //    headers: {
   //       'Authorization': `Bearer ${jwtCookie}`
   //    },
   //    body: JSON.stringify({
   //       username: 'henrybsilva',
   //       password: 'fFLj%TQx*Z4XsR'
   //    })
   // });

   // console.log('AUTH', await authResponse.json());
   
   // console.log(cookies.getAll());
}