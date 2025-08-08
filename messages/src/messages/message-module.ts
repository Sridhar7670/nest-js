import { Module } from "@nestjs/common";
import { MessagesController } from "./messages.controller";
import { AppController } from "src/app.controller";
import { MessageServices } from "./messages-services";
import { MessageRepository } from "./messages-repository";

@Module({
    imports: [],
    controllers: [MessagesController,AppController],
    providers: [MessageServices,MessageRepository]
})
export class MessageModule {}