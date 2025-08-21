import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';



// export class SerializeInterceptor implements NestInterceptor{
//     intercept(context:ExecutionContext,handler:CallHandler):Observable<any>{
//         //run something before a request is handled
//         //by the request handler
//         //if wated to run some logic before request is handled put code here  
//         console.log('Im running before the handler',context)

//         return handler.handle().pipe(
//             map((data:any)=>{
//                 //run something before response is sent out 
//                 //put some logic here if u wanted to do anything before the repsonse is sent out.
//                 console.log('im running before the reposne is sent out ',data)
//             })
//         )
//     }
// }


// export class SerializeInterceptor implements NestInterceptor{
    
//     intercept(context:ExecutionContext,handler:CallHandler):Observable<any>{
        

//         return handler.handle().pipe(
//             map( (data:any) =>{
//                 return plainToInstance(UserDto,data,{      //we can use this.dto or UserDto it is upto us but this is good this.dto 
//                     excludeExtraneousValues:true,
//                 })
//             })
//         )
//     }
// }

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto:any){}
    intercept(context:ExecutionContext,handler:CallHandler):Observable<any>{
        return handler.handle().pipe(
            map( (data:any) =>{
                return plainToInstance(this.dto,data,{
                    excludeExtraneousValues:true,
                })
            })
        )
    }
}

interface ClassConstructor{
    new (...args :any[]) :{}
}
// export function Serialize(dto:any){ using any is not so better for debugging insted using the ClassConstructor is correct 

export function Serialize(dto:ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto));
}