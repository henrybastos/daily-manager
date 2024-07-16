import Database from 'better-sqlite3';
import dotenv from 'dotenv';

export function GET() {
   dotenv.config();
   console.log('database path', process.env.DATABASE_PATH);
   const db = new Database(process.env.DATABASE_PATH);

   let transactions = db.prepare('SELECT * FROM transactions').all();
   transactions = transactions.map(t => {
      if (t?.recurrent) {
         t.recurrent = JSON.parse(t.recurrent);
      }
      return t;
   })
   return new Response(JSON.stringify({
      transactions
   }), { status: 200 });
}

export async function POST({ request }) {
   dotenv.config();
   const data = await request.json();

   const avaiableKeys = [
      'id',
      'kind',
      'amount',
      'title',
      'description',
      'supplier',
      'creationDate',
      'referenceDate',
      'source',
      'recurrent',
      'adjusted'
   ];
   const db = new Database(process.env.DATABASE_PATH);
   // Filters out unknown keys, preventing the user from inserting unknown data structures.
   const keysToAdd = Object.keys(data).filter(v => avaiableKeys.includes(v));

   db.prepare(`
      CREATE TABLE IF NOT EXISTS transactions (
         id VARCHAR(64) PRIMARY KEY NOT NULL,
         kind VARCHAR(16) NOT NULL,
         amount REAL NOT NULL,
         title VARCHAR(256) NOT NULL,
         description TEXT,
         supplier VARCHAR(64) NOT NULL,
         creationDate VARCHAR(32) NOT NULL,
         referenceDate VARCHAR(32) NOT NULL,
         source VARCHAR(64) NOT NULL,
         recurrent TEXT,
         adjusted INTEGER
      );
   `).run();

   db.prepare(`
      INSERT INTO transactions ( ${ keysToAdd.join(', ') } ) VALUES (${ keysToAdd.map(v => ':' + v).join(', ') });
   `).run(data);

   return new Response(JSON.stringify({
      transaction: data.transaction
   }), { status: 200 });
}
