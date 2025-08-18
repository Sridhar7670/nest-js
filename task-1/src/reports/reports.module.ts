
// src/reports/reports.module.ts
// Module for handling all report-related components.

import { Module } from '@nestjs/common';   
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { AppController } from 'src/app.controller';

@Module({
  controllers: [ReportsController,AppController],
  providers: [ReportsService],
})
export class ReportsModule {} 