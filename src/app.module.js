import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DirectoriesController } from './directories/directories.controller';
import { DirectoriesService } from './directories/directories.service';

@Module({
  imports: [],
  controllers: [AppController, DirectoriesController],
  providers: [AppService, DirectoriesService],
})
export class AppModule {}
