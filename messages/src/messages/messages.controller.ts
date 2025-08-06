import { Controller ,Get,Post,Body,Param, Delete, Put} from '@nestjs/common';
import { createDtoMessage,createMessageDtoNumber, PostDto, UpdateMessageDTO } from './DTO/create-message.dto';
import { MessageServices } from './messages-services';


@Controller('messages')
export class MessagesController {
    messageService:MessageServices
    // The constructor initializes the MessageServices instance 
    constructor(){
        this.messageService= new MessageServices();
    }
    @Get()
    getMessages() {
       return this.messageService.findAll();
    }

    @Post()
    createMessageWithDTO(@Body() body: createDtoMessage) {
        console.log(body.id,body.Content);
        // Here you would typically save the message to a database
        // For now, we just return a success message
        // return 'a new message has been created on such action ';
        return this.messageService.create(body)
    }
    
    @Post('create')
    
    createMessage(@Body() body:createMessageDtoNumber) {
        console.log(typeof body.UserId);
        return 'a new message has been created with DTO';
    }

    @Post('full-validation')
  createFullPost(@Body() body: PostDto) {
    console.log('Received a post with full validation:', body);
    return 'Successfully created a post with complex validation!';
  }

  @Put(':id')
  UpdateMessage(@Param("id") id: string,@Body() body:UpdateMessageDTO){
    console.log(id, body.Content);
    return this.messageService.update(id, body.Content);

  }

    @Get(':id')
    getMessageById(@Param('id') id:string) {
        console.log(id)
        // return 'This action returns a message by ID';
        return this.messageService.findOne(id);
    }

    @Delete(":id")
    DeleteMessageById(@Param('id') id:string) {
        console.log(id)
        // return 'This action deletes a message by ID';
        return this.messageService.delete(id);
    }
}
