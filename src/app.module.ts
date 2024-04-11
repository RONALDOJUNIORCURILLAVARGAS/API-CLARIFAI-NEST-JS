import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClarifaiModule } from './clarifai/clarifai.module';


@Module({
  imports: [ConfigModule.forRoot(), ClarifaiModule],
})
export class AppModule {}
