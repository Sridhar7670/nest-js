
/*
* -------------------
* app.service.ts
* -------------------
* This service is responsible for the business logic. In this case, it just
* returns a simple status object. In a real-world application, this service
* might check database connections or other critical dependencies.
*/
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthCheck(): { status: string } {
    return { status: 'HEATH IS OKAY' };
  }
}

