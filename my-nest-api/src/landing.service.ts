import { Injectable } from '@nestjs/common';

@Injectable()
export class LandingPageService {
  landingInfo(): { status: string } {
    return { status: 'HELLO WORLD' };
  }
}
