import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClarifaiService } from './clarifai.service';
import { PrompDto } from './dtos';

@Controller('clarifai')
export class ClarifaiController {
  constructor(private readonly clarifaiService: ClarifaiService) {}
  @Post('generate-image')
  async prompCheck(@Body() PrompDto: PrompDto) {
      return this.clarifaiService.prompCheck(PrompDto)
      
  }
}
