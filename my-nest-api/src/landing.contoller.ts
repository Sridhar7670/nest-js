import { Controller, Get } from '@nestjs/common';
import { LandingPageService } from './landing.service';


@Controller('/')
export class LandingPageController {
  constructor(private readonly landingService: LandingPageService) {}

  @Get()
  landingInfo(): { status: string } {
    return this.landingService.landingInfo();
  }
}
