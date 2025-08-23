import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{
    constructor(private userService:UsersService){}

    async intercept(context:ExecutionContext,handler:CallHandler){
        const request=context.switchToHttp().getRequest();
        console.log('hie',request.session,)
        const {id}=request.session;

        if(id){
            const user=await this.userService.findOne(id);
            request.currentuser=user;
            console.log('hi',request.currentuser)
        }
        return handler.handle();

    }
}