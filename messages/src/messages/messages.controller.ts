import { Controller ,Get,Post,Body,Param} from '@nestjs/common';
import { createDtoMessage,createMessageDtoNumber, PostDto } from './DTO/create-message.dto';


@Controller('messages')
export class MessagesController {
    @Get()
    getMessages() {
        return 'This action returns all messages';
    }

    @Post()
    createMessageWithDTO(@Body() body: createDtoMessage) {
        console.log(body);
        // Here you would typically save the message to a database
        // For now, we just return a success message
        return 'a new message has been created on such action ';
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

    @Get(':id')
    getMessageById(@Param('id') id:string) {
        console.log(id)
        return 'This action returns a message by ID';
    }
}
