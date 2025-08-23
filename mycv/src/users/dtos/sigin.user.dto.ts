import { IsEmail, IsString } from "class-validator";

export class SigninuserDto{
    @IsEmail()
    email:string

    @IsString()
    password:string

   
}


