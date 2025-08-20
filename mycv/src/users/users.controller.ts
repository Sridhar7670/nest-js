import { Body,Controller ,Delete,Get,Param,Patch,Post, Query} from "@nestjs/common";
import { CreateuserDto } from "./dtos/create.user.dto";
import { UsersService } from "./users.service";
import { UpadteUserDto } from "./dtos/update-user.dto";

@Controller('auth')
export class userController{
    constructor (private service:UsersService){}

    @Post('/signup')
    createUser(@Body() body:CreateuserDto){
        console.log(body)
        this.service.create(body.email,body.password,body.username)
        return "user added sucessfully"
    }

    @Get('/:id')
    finduser(@Param('id') id:string){
       return this.service.findOne(parseInt(id))
    }

    @Get()
    findAllUsers(@Query('email') email:string){
        return this.service.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string){
        return this.service.remove(parseInt(id));
    }

    @Patch('/:id')
    updateuser(@Param('id' )id:string,@Body() body:UpadteUserDto){
        return this.service.update(parseInt(id),body)
    }
}