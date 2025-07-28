/*
* -------------------
* app.module.ts
* -------------------
* This is the root module of the application. It's a good practice to keep the
* root module clean and import other modules here. For this basic example,
* we only have one controller and one service.
*/


import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LandingPageService } from './landing.service';
import { LandingPageController } from './landing.contoller';

@Module({
  imports: [],  //This array would contain a list of other modules that this module needs. Since our application is very simple, it's empty.
  controllers: [AppController, LandingPageController],//This array lists all the controllers that will be instantiated in this module. Here, we are telling the module to manage AppController
  providers: [AppService, LandingPageService],
  //This array lists the services that this module provides. These services can then be "injected" into controllers or other services. Here, we are making AppService available.
})
export class AppModule {}

