import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt=promisify(_scrypt);

@Injectable()
export class AuthService{
    constructor(private usersService:UsersService){}

    async signup(email:string,password:string,username:string){
        const users=await this.usersService.find(email)
        if(users){
            throw new BadRequestException('email is already in use ')
        }
        const salt=randomBytes(8).toString('hex');
        const hash=await scrypt(password,salt,32) as Buffer;

        const encrypted_pass=salt+"."+hash.toString('hex');
        const user=await this.usersService.create(email,encrypted_pass,username);
        return user;
    }

    async signin(email:string,password:string){
        const user=await this.usersService.find(email);
        if(!user){
            throw new NotFoundException('user is not found ');
        }
        const [salt,storedhash]=user.password.split(".");
        const hash=await scrypt(password,salt,32) as Buffer;

        if(storedhash!==hash.toString('hex')){
            throw new BadRequestException('Password Incorrect')
        }
        else {
            return user;
        }
    }
}