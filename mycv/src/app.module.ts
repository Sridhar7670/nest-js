import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import{TypeOrmModule} from '@nestjs/typeorm';
import { AppService } from './app.service';
import { user } from './users/users.entity';
import { Report } from './reports/reports.entity';
import { userModule } from './users/users.module';
import { userController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'myuser',
      password: 'root', // Use environment variables for this!
      database: 'mydb',
      entities: [user,Report], // List all your entities here
      synchronize: true, // Only for development If true, TypeORM will automatically update your database tables to match your entity classes. This is great for development but should be turned off in production.
  }),userModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
