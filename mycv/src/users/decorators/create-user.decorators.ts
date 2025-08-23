// import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// export const currentuser= createParamDecorator(
//     (data:any,context:ExecutionContext)=>{
//         const request =context.switchToHttp().getRequest();
//         console.log(request.session,request)
//         // return 'hi user ' 
//         // return request.session.id
//         return request.currentuser
//     }
// )

import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator( // Renamed for clarity
    (data: any, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        // Return the user object that the interceptor attached
        console.log(request.currentuser)    //undefined ?? some values userobj with pass email id username 
        return request.currentuser; 
    }
);