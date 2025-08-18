
// src/auth/auth.controller.ts
// Handles incoming HTTP requests for the /auth route.

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto'; 
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: AuthDto) {
    // return "testing"
    return this.authService.signup(body.email, body.password ,body.username );
  }

  @Post('/login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
}