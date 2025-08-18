// // src/database/db.service.ts
// // A simple service to simulate database interactions using a JSON file.

// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { readFile, writeFile } from 'fs/promises';
// import { join } from 'path';

// @Injectable()
// export class DbService implements OnModuleInit {
//   private readonly dbPath = join(process.cwd(), 'db.json');
//   private db: { users: any; reports: any };

//   async onModuleInit() {
//     try {
//       const file = await readFile(this.dbPath, 'utf8');
//       this.db = JSON.parse(file);
//     } catch (error) {
//       // If file doesn't exist, create it with a default structure
//       this.db = { users: {}, reports: {} };
//       await this.save();
//     }
//   }

//   get(table: 'users' | 'reports') {
//     return this.db[table];
//   }

//   async save() {
//     await writeFile(this.dbPath, JSON.stringify(this.db, null, 2));
//   }. 
// }


// src/database/db.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg'; // The PostgreSQL client

@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  async onModuleInit() {
    this.pool = new Pool({
      // Paste your Supabase connection string here
      // IMPORTANT: In a real project, store this in a .env file for security!
      connectionString: 'postgresql://postgres.dcdkfphsdjsneemlyngm:Fetch@123456AQWE@aws-1-ap-south-1.pooler.supabase.com:5432/postgres',
      
    });
    // this.pool = new Pool({
    //   user: 'postgres',
    //   host: 'db.dcdkfphsdjsneemlyngm.supabase.co',
    //   database: 'postgres',
    //   password: 'Fetch@123456AQWE', 
    //   port: 5432,
    //   ssl: {
    //     rejectUnauthorized: false 
    //   }
    // });

    try {
      // Test the connection
      await this.pool.query('SELECT NOW()');
      console.log(' Successfully connected to Supabase PostgreSQL database.');
    } catch (error) {
      console.error(' Failed to connect to Supabase PostgreSQL database:', error.message);
    }
  }

  async onModuleDestroy() {
    // Gracefully close the connection pool when the app shuts down
    await this.pool.end();
  }

  /**
   * Executes a SQL query.
   * @param queryText The SQL query string (e.g., 'SELECT * FROM users WHERE id = $1').
   * @param values The parameters for the query (e.g., [1]).
   * @returns The result from the database.
   */
  async query(queryText: string, values: any[] = []) {
    const client = await this.pool.connect();
    try {
      return await client.query(queryText, values);
    } finally {
      client.release(); // Always release the client back to the pool
    }
  }
}