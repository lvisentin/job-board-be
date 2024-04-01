import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [JobsController],
  imports: [HttpModule],
  providers: [JobsService],
})
export class JobsModule {}
