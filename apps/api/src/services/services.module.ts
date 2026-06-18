import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesApiService } from './services.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesApiService],
})
export class ServicesModule {}
