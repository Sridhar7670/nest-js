
import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DbService } from '../database/db.service';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private db: DbService,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    const users = this.db.get('users');
    const existingUser = Object.values(users).find((user: User) => user.email === email);
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newId = (Math.max(0, ...Object.keys(users).map(Number)) + 1);
    const user: User = { id: newId, email, password: hashedPassword };
    users[newId] = user;
    await this.db.save();

    return this.generateToken(user);
  }

  async signin(email: string, password: string) {
    const users = this.db.get('users') as Record<number, User>;
    const user = Object.values(users).find((u): u is User => u.email === email);

    if (!user) {
      throw new NotFoundException('User with this email not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}