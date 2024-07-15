import { writable } from "svelte/store";
// import Database from 'better-sqlite3';

// function createDatabase() {
//    const db = new Database('/database/data.db');
//    db.pragma('journal_mode = WAL');

//    db.prepare(`
//       CREATE IF NOT EXISTS suppliers (
//          name VARCHAR(255) NOT NULL,
//          id INTEGER PRIMARY KEY NOT NULL
//       );
//    `).run();
//    console.log('Database "suppliers" created.');
// }

export const Suppliers = 

function createSuppliers() {
   const { subscribe, update, set } = writable([]);

   const newSupplier = (name) => {
      update(suppliers => {
         return [
            ...suppliers,
            name
         ]
      })
   }

   return {
      subscribe,
      newSupplier
   }
}