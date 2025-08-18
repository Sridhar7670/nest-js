import { Controller,Get } from "@nestjs/common";

@Controller("/")
class AppController {
    @Get("/hi")
    getRouteRoute(){ 
        return "Hello, Sridhar!";
    }
    @Get("/bye")
    getByeRoute(){
        return "Goodbye, Sridhar!";
    }

    @Get("/greet")
    getGreetRoute(){
        return "Greetings, Sridhar!";
    }

    @Get("/farewell")
    getFarewellRoute(){
        return "Farewell, Sridhar!";
    }
}
export { AppController };