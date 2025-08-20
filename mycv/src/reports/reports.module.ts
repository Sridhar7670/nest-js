import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  // You would add controllers and services here later
  // controllers: [ReportsController],
  // providers: [ReportsService],
})
export class ReportsModule {}