import Database from 'better-sqlite3';
import dotenv from 'dotenv';
import crypto from 'node:crypto';

dotenv.config();
console.log('database path', process.env.DATABASE_PATH);
const db = new Database(process.env.DATABASE_PATH);

db.prepare(`CREATE TABLE IF NOT EXISTS suppliers (
   id VARCHAR(128) PRIMARY KEY NOT NULL,
   name VARCHAR(64) NOT NULL
);`).run();

export function GET() {
   let suppliers = db.prepare(`SELECT * FROM suppliers`).all();

   return new Response(JSON.stringify({
      suppliers
   }), { status: 200 });
}

export async function POST({ request }) {
   const data = await request.json();

   if (!data.name) {
      return new Response(JSON.stringify({ error: 'Supplier name was not provided.' }),
      { status: 400 })
   }

   db.prepare(`INSERT INTO suppliers (id, name) VALUES (?, ?)`).run(
      crypto.randomUUID(),
      data.name
   );

   console.log('New supplier added:', data.name);

   return new Response(JSON.stringify({
      success: `New supplier added: ${ data.name }`
   }), { status: 200 });
}

export async function DELETE() {
   db.prepare(`DELETE FROM suppliers`).run();
   return new Response(JSON.stringify({ 
      success: 'All data deleted from table suppliers.' 
   }),{ status: 200 });
}