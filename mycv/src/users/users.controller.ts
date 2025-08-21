import { Body,ClassSerializerInterceptor,Controller ,Delete,Get,NotFoundException,Param,Patch,Post, Query, UseInterceptors} from "@nestjs/common";
import { CreateuserDto } from "./dtos/create.user.dto";
import { UsersService } from "./users.service";
import { UpadteUserDto } from "./dtos/update-user.dto";
import { Serialize, SerializeInterceptor } from "src/interceptors/serialize.interceptor";
// insted of importing serializeInterceptor just import serialize 
import { UserDto } from "./dtos/user.dto";

    @Serialize(UserDto)  
    @Controller('auth')
    export class userController{
    constructor (private service:UsersService){}

    @Post('/signup')
    createUser(@Body() body:CreateuserDto){
        console.log(body)
        this.service.create(body.email,body.password,body.username)
        return "user added sucessfully"
    }

    // @UseInterceptors(new SerializeInterceptor(UserDto))  //to write this even easier we call fucntion from interceptor
    //@Serialize(UserDto)   //we can also use this at the top of contoller so all the routes will be intercepted by the class 
    @Get('/:id')
    async finduser(@Param('id') id:string){

       const user= await this.service.findOne(parseInt(id));
       if(!user){
        throw new NotFoundException('user not found');
       }
       return user;
    }
    // @UseInterceptors(ClassSerializerInterceptor)
    // @UseInterceptors(SerializeInterceptor)
    //@Serialize(UserDto)
    @Get()
    findAllUsersByEmail(@Query('email') email:string){
        console.log('handler is running')
        return this.service.find(email);
    }

    //@Serialize(UserDto)
    @Get('/user/all')
    findAllUsers(){
        return this.service.findAll()
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