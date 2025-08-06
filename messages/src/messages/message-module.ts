import { Module } from "@nestjs/common";
import { MessagesController } from "./messages.controller";
import { AppController } from "src/app.controller";

@Module({
    imports: [],
    controllers: [MessagesController,AppController],
    providers: []
})
export class MessageModule {}