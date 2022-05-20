import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DirectoriesController } from './directories/directories.controller';

@Module({
  imports: [],
  controllers: [AppController, DirectoriesController],
  providers: [AppService],
})
export class AppModule {}
