
import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DbService } from '../database/db.service';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';

interface DecodedToken {
  username?: string;
  email?: string;
  sub?: string;
}

interface AuthContextType {
  token: string | null;
  user: DecodedToken | null; 
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}


@Injectable()
export class AuthService {
  constructor(
    private db: DbService,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string,username:string) {
    const users = this.db.get('users');
    console.log(users,"hiii");
    const existingUser = Object.values(users).find((user: User) => user.email === email);
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newId = (Math.max(0, ...Object.keys(users).map(Number)) + 1);
    const user: User = { id: newId, email, password: hashedPassword ,username: username};
    users[newId] = user;
    await this.db.save();

    return this.generateToken(user);
  }

  async login(email: string, password: string) {
    const users = this.db.get('users') as Record<number, User>;
    const user = Object.values(users).find((u): u is User => u.email === email);
    console.log(user,"src/auth/auth.service.ts");

    if (!user) {
      throw new NotFoundException('User with this email not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Please verify the Password');
    }

    return this.generateToken(user);
  }

  private generateToken(user: User) {
  const payload = {
    email: user.email,
    sub: user.id,
    username: user.username, 
  };

  return {
    access_token: this.jwtService.sign(payload),
  };
}



async validate(payload: any) {
  // payload includes email, sub (id), and username
  return {
    userId: payload.sub,
    email: payload.email,
    username: payload.username,
  };
}


}