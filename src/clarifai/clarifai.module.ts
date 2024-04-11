import { Module } from '@nestjs/common';
import { ClarifaiService } from './clarifai.service';
import { ClarifaiController } from './clarifai.controller';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  controllers: [ClarifaiController],
  providers: [ClarifaiService],
})
export class ClarifaiModule {}
