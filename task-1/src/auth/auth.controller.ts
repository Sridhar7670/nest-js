
// src/auth/auth.controller.ts
// Handles incoming HTTP requests for the /auth route.

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: AuthDto) {
    return this.authService.signup(body.email, body.password ,body.username );
  }

  @Post('/login')
  signin(@Body() body: AuthDto) {
    return this.authService.signin(body.email, body.password,body.username);
  }
}