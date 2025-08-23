import { Body,ClassSerializerInterceptor,Controller ,Delete,Get,NotFoundException,Param,Patch,Post, Query, UseInterceptors,Session,UseGuards} from "@nestjs/common";
import { CreateuserDto } from "./dtos/create.user.dto";
import { UsersService } from "./users.service";
import { UpadteUserDto } from "./dtos/update-user.dto";
import { Serialize, SerializeInterceptor } from "src/interceptors/serialize.interceptor";
// insted of importing serializeInterceptor just import serialize 
import { UserDto } from "./dtos/user.dto";
import { AuthService } from "./auth.service";
import { SigninuserDto } from "./dtos/sigin.user.dto";
import { CurrentUser } from "./decorators/create-user.decorators";
// import { CurrentUserInterceptor } from "./interceptors/current-user.interceptor";
import { user } from "./users.entity";
import { AuthGuard } from "src/guards/auth.guards";

    @Serialize(UserDto)  
    @Controller('auth')    
    // @UseInterceptors(CurrentUserInterceptor)
    export class userController{
    constructor (private service:UsersService,
                private authService:AuthService
    ){}

    // @Get('/session/whoami')
    // WhoAmI(@Session() session:any){
    //     return this.service.findOne(session.id)
    // }

    // @Get('session/whoami')
    // WhoAmi(@CurrentUser() user:string){
    //     return user;
    // }

    @Get('session/whoami')
    @UseGuards(AuthGuard)
    WhoAmi(@CurrentUser() user:user){
        return user;
    }

    @Post('/signup')
    // async createUser(@Body() body:CreateuserDto){
    async createUser(@Body() body:CreateuserDto,@Session() session:any){

        console.log(body)
        // this.service.create(body.email,body.password,body.username)
        // this.authService.signup(body.email,body.password,body.username)
        // return "user added sucessfully"

        const user=await this.authService.signup(body.email,body.password,body.username)
        session.id= user.id;
        return [user,session];
    }

    @Post('/signin')
    async signin(@Body() body: SigninuserDto,@Session() session:any){
        const user=await this.authService.signin(body.email,body.password);
        session.id=user.id;
        return [user,session];
    }

    @Post('/signout')
    signout(@Session() session :any){

        if(session.id===null) return null 
        session.id=null
        return "user logged out "
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

    

    @Get('/colors/:color')
    SetColor(@Param('color') color:string, @Session() session:any){
        return session.color=color;
    }

    @Get('/colors/colour')
    getColor(@Session() session:any){
        return session.color
    }
}