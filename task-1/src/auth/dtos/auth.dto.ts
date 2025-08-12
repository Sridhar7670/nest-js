import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(1,{message: 'username must not be Empty'})
  username:string;
}