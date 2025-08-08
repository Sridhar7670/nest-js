
// src/auth/jwt.strategy.ts
// Defines how the application validates incoming JWTs.

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'yourSecretKey', // IMPORTANT: Must match the secret in AuthModule
    });
  }

  async validate(payload: any) {
    // The payload is the decoded JWT. This return value is attached to the request object.
    return { userId: payload.sub, email: payload.email };
  }
}