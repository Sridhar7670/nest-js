
import { IsString, IsNumber, IsBoolean, IsLongitude, IsLatitude, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateReportDto {
  @IsString() make: string;
  @IsString() model: string;
  @IsNumber() @Min(1930) @Max(2050) year: number;
  @IsNumber() @Min(0) mileage: number;
  @IsLongitude() lng: number;
  @IsLatitude() lat: number;
  @IsNumber() @Min(0) price: number;
}

export class ApproveReportDto {
  @IsBoolean() approved: boolean;
}

export class GetEstimateDto {
  @IsString() make: string;
  @IsString() model: string;
  @Transform(({ value }) => parseInt(value)) @IsNumber() @Min(1930) @Max(2050) year: number;
  @Transform(({ value }) => parseInt(value)) @IsNumber() @Min(0) mileage: number;
  @Transform(({ value }) => parseFloat(value)) @IsLongitude() lng: number;
  @Transform(({ value }) => parseFloat(value)) @IsLatitude() lat: number;
}