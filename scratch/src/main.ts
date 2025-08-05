import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";


// This function's name is bootstrap, which means 'to start up'.
async function bootstrap() {
  
  // This line is very important.
  // NestFactory is a helper class in NestJS. We pass our main module (AppModule) to it.
  // The 'create' method takes that AppModule, loads all the controllers and providers within it,
  // and creates our entire application as an object.
  // This process takes a little bit of time, which is why we've used 'await'.
  const app = await NestFactory.create(AppModule);

  // Now our application is ready (it's stored in the `app` variable).
  // 'app.listen(3000)' is like telling the app, "Hey app, please listen on port number 3000."
  // This means it will wait on port 3000 for incoming requests from the outside.
  // If someone opens http://localhost:3000 in a browser, our app will respond.
  await app.listen(3000);
  console.log("Application is running on: http://localhost:3000");
}

// Here, we are calling the 'bootstrap' function that we defined above.
// If we don't call this, the program won't run at all!
bootstrap();
