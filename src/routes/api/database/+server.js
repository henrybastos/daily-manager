import Database from 'better-sqlite3';

export async function POST({ request }) {
   const db = new Database('database/data.db');
   const data = await request.json();

   db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         username VARCHAR(255) NOT NULL,
         password TEXT NOT NULL
      );
   `).run();

   if (data.username && data.password) {
      const newUser = db
         .prepare('INSERT INTO users (username, password) VALUES (?, ?)')
         .run(data.username, data.password);
      console.log('LOGIN', data, newUser);
   }

   return new Response(JSON.stringify({
      status: 'new_user_created',
      data
   }), { status: 200 })
}

// Ganhe acesso exclusivo ao grupo VIP no WhatsApp para suporte direto!
// https://kronus.kebook.com.br/assets/255cbd76-d5f1-4aa6-a8e0-a12a9ec1b07c.webp

// Aproveite 40% de desconto e ganhe
// acesso exclusivo ao Grupo VIP no WhatsApp para suporte direto!
// APROVEITE ESSE DESCONTO

// ?cupom=OFERTAEXCLUSIVA