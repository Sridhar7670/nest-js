
// src/reports/reports.service.ts
// Contains the business logic for managing car reports.

import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../database/db.service';
import { CreateReportDto, GetEstimateDto } from './dtos/report.dto';

@Injectable()
export class ReportsService {
  constructor(private db: DbService) {}

  create(reportDto: CreateReportDto, user: any) {
    const reports = this.db.get('reports');
    const newId = (Math.max(0, ...Object.keys(reports).map(Number)) + 1).toString();
    const report = {
      id: newId,
      ...reportDto,
      approved: false,
      userId: user.userId, // Associate report with the user from the token
    };
    reports[newId] = report;
    this.db.save();
    return report;
  }

  async changeApproval(id: string, approved: boolean) {
    const reports = this.db.get('reports');
    if (!reports[id]) {
      throw new NotFoundException('Report not found');
    }
    reports[id].approved = approved;
    await this.db.save();
    return reports[id];
  }

  getEstimate(estimateDto: GetEstimateDto) {
    const reports = this.db.get('reports');
  console.log(reports);

    // This is a simplified estimation logic for demonstration
    const filteredReports:any[] = Object.values(reports).filter((report: any) =>
        report.make === estimateDto.make &&
        report.model === estimateDto.model &&
        Math.abs(report.year - estimateDto.year) <= 3
    );
    const avgPrice = filteredReports.reduce((sum, report: any) => sum + report.price, 0) / (filteredReports.length || 1);
    return { estimatedPrice: avgPrice.toFixed(2) };
  }

//   findAll() {
//   // This method simply gets the 'reports' table from our DbService
//   console.log(this.db.get('reports'));
//   return this.db.get('reports');
// }


findAll(userId: number) {
  const reports = this.db.get('reports');
  
  // Filter the reports to only include ones created by the specified user
  const userReports = Object.values(reports).filter(
    (report: any) => report.userId === userId,
  );

  return userReports;
}
}