import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpadteUserDto{
    @IsEmail()
    @IsOptional()
    email:string;

    @IsOptional()
    @IsString()
    password:string;
}