import { Module } from "@nestjs/common";
import { user } from "./users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports:[TypeOrmModule.forFeature([user])],
    controllers:[userController],
    providers:[UsersService]
})
export class userModule{}