import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClarifaiService } from './clarifai.service';
import { PrompDto } from './dtos';

@Controller('clarifai')
export class ClarifaiController {
  constructor(private readonly clarifaiService: ClarifaiService) {}
  @Post('orthography')
  async orthography(@Body() PrompDto: PrompDto) {
    return this.clarifaiService.orthography(PrompDto)
  }
  @Post('translate')
  async translate(@Body() PrompDto: PrompDto) {
    return this.clarifaiService.translate(PrompDto)
  }
  @Post('generate-image')
  async prompCheck(@Body() PrompDto: PrompDto) {
      return this.clarifaiService.prompCheck(PrompDto)
      
  }

  @Post('text-to-audio')
  async textToAudio(@Body() PrompDto: PrompDto) {
    return this.clarifaiService.textToAudio(PrompDto)
  }
}
