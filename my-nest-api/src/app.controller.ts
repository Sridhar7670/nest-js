
/*
* -------------------
* app.controller.ts
* -------------------
* This controller is responsible for handling incoming requests and returning
* responses to the client. The `@Controller()` decorator defines a basic
* controller. The `@Get('/health')` decorator defines a route for GET requests
* to the /health path.
*/
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealthCheck(): { status: string } {
    return this.appService.getHealthCheck();
  }
}

