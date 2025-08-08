
import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';

@Global() // Makes DbService available application-wide
@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DatabaseModule {}