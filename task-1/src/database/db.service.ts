// src/database/db.service.ts
// A simple service to simulate database interactions using a JSON file.

import { Injectable, OnModuleInit } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class DbService implements OnModuleInit {
  private readonly dbPath = join(process.cwd(), 'db.json');
  private db: { users: any; reports: any };

  async onModuleInit() {
    try {
      const file = await readFile(this.dbPath, 'utf8');
      this.db = JSON.parse(file);
    } catch (error) {
      // If file doesn't exist, create it with a default structure
      this.db = { users: {}, reports: {} };
      await this.save();
    }
  }

  get(table: 'users' | 'reports') {
    return this.db[table];
  }

  async save() {
    await writeFile(this.dbPath, JSON.stringify(this.db, null, 2));
  }
}