
// src/app.module.ts
// The root module that ties everything together.

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ReportsModule } from './reports/reports.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, ReportsModule, DatabaseModule],
})
export class AppModule {}