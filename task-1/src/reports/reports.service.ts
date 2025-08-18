
// // src/reports/reports.service.ts
// // Contains the business logic for managing car reports.

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { DbService } from '../database/db.service';
// import { CreateReportDto, GetEstimateDto } from './dtos/report.dto';

// @Injectable()
// export class ReportsService {
//   constructor(private db: DbService) {}

//   create(reportDto: CreateReportDto, user: any) {
//     const reports = this.db.get('reports');
//     const newId = (Math.max(0, ...Object.keys(reports).map(Number)) + 1).toString();
//     const report = {
//       id: newId,
//       ...reportDto,
//       approved: false,
//       userId: user.userId, // Associate report with the user from the token
//     };
//     reports[newId] = report;
//     this.db.save();
//     return report;
//   }

//   async changeApproval(id: string, approved: boolean) {
//     const reports = this.db.get('reports');
//     if (!reports[id]) {
//       throw new NotFoundException('Report not found');
//     }
//     reports[id].approved = approved;
//     await this.db.save();
//     return reports[id];
//   }

//   getEstimate(estimateDto: GetEstimateDto) {
//     const reports = this.db.get('reports');
//   console.log(reports);

//     // This is a simplified estimation logic for demonstration
//     const filteredReports:any[] = Object.values(reports).filter((report: any) =>
//         report.make === estimateDto.make &&
//         report.model === estimateDto.model &&
//         Math.abs(report.year - estimateDto.year) <= 3
//     );
//     const avgPrice = filteredReports.reduce((sum, report: any) => sum + report.price, 0) / (filteredReports.length || 1);
//     return { estimatedPrice: avgPrice.toFixed(2) };
//   }

// //   findAll() {
// //   // This method simply gets the 'reports' table from our DbService
// //   console.log(this.db.get('reports'));
// //   return this.db.get('reports');
// // }


// findAll(userId: number) {
//   const reports = this.db.get('reports');
  
//   // Filter the reports to only include ones created by the specified user
//   const userReports = Object.values(reports).filter(
//     (report: any) => report.userId === userId,
//   );

//   return userReports;
// }
// }




import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../database/db.service';
import { CreateReportDto, GetEstimateDto } from './dtos/report.dto';

@Injectable()
export class ReportsService {
  constructor(private db: DbService) {}

  async create(reportDto: CreateReportDto, user: any) {
    const { make, model, year, mileage, lng, lat, price } = reportDto;
    // Use an INSERT query to create a new report
    const { rows } = await this.db.query(
      `INSERT INTO "reports" (make, model, year, mileage, lng, lat, price, "userId") 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [make, model, year, mileage, lng, lat, price, user.userId],
    );
    return rows[0];
  }

  async changeApproval(id: string, approved: boolean) {
    // Use an UPDATE query to change the approval status
    const { rows } = await this.db.query(
      'UPDATE "reports" SET approved = $1 WHERE id = $2 RETURNING *',
      [approved, id],
    );
    if (rows.length === 0) {
      throw new NotFoundException('Report not found');
    }
    return rows[0];
  }

  async findAll(userId: number) {
    // Use a SELECT query to get all reports for a specific user
    const { rows } = await this.db.query(
      'SELECT * FROM "reports" WHERE "userId" = $1',
      [userId],
    );
    return rows;
  }
 
  async getEstimate(estimateDto: GetEstimateDto) {
    const { make, model, year, mileage, lng, lat } = estimateDto;
    // Use a more complex SELECT query for the estimation logic
    const { rows } = await this.db.query(
      `SELECT AVG(price)::int as price FROM "reports" 
       WHERE make = $1 
       AND model = $2 
       AND lng - $3 BETWEEN -5 AND 5 
       AND lat - $4 BETWEEN -5 AND 5 
       AND year - $5 BETWEEN -3 AND 3
       AND approved = TRUE
       ORDER BY ABS(mileage - $6)
       LIMIT 3`,
      [make, model, lng, lat, year, mileage],
    );
    return rows[0];
  }
}