import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { user } from "./users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { CurrentUserInterceptor } from "./interceptors/current-user.interceptor";

@Module({
    imports:[TypeOrmModule.forFeature([user])],
    controllers:[userController],
    providers:[UsersService,
        AuthService,
       { provide:APP_INTERCEPTOR,
        useClass: CurrentUserInterceptor}]   //Globally Scoped Interceptor 
})
export class userModule{}