
// src/reports/reports.controller.ts
// Handles incoming HTTP requests for the /reports route.

import { Controller, Post, Patch, Get, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateReportDto, ApproveReportDto, GetEstimateDto } from './dtos/report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.getEstimate(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard) // Protect this endpoint
  createReport(@Body() body: CreateReportDto, @Request() req) {
    // The user object from the JWT payload is available on req.user
    return this.reportsService.create(body, req.user);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard) // Protect this endpoint
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }

  // @Get('/all')
  // @UseGuards(JwtAuthGuard) // Protect this endpoint so only logged-in users can access it
  // findAllReports() {
  //   return this.reportsService.findAll(); 
  // }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  findAllReports(@Request() req) {
    // req.user is populated by the JwtStrategy after validating the token.
    // It contains the payload: { userId: number, email: string }
    const userId = req.user.userId;

    // Pass the logged-in user's ID to the service method
    return this.reportsService.findAll(userId);
  }
}