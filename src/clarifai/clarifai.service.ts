import { Injectable } from '@nestjs/common';
import { PrompDto } from './dtos/prompt.dto';
import { HttpService } from '@nestjs/axios';

import { firstValueFrom } from 'rxjs';
@Injectable()
export class ClarifaiService {
  constructor(private readonly httpService: HttpService) {}
  async prompCheck(PrompDto: PrompDto) {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Key ${process.env.CLARIFAI_API_KEY}`,
        },
      };
      const payload = {
        inputs: [{ data: { text: { raw: PrompDto.prompt } } }],
      };
      const url =
        `${process.env.CLARIFAI_API_URL}/` +
        `${process.env.CLARIFAI_API_VERSION}/users/` +
        `${process.env.CLARIFAI_USER_ID}/apps/` +
        `${process.env.CLARIFAI_APP_ID}/models/` +
        `${process.env.CLARIFAI_MODEL_ID}/versions/` +
        `${process.env.CLARIFAI_MODEL_VERSION_ID}/outputs`;
      const { data: response } = await firstValueFrom(
        this.httpService.post(url, JSON.stringify(payload), config),
      );
      return { image: response.outputs[0].data.image.base64 };
    } catch (error) {
      throw new Error('Hubo un error al realizar la solicitud');
    }
  }
  async textToAudio(PrompDto: PrompDto) {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Key ${process.env.CLARIFAI_API_KEY}`,
        },
      };
      const payload = {
        inputs: [{ data: { text: { raw: PrompDto.prompt } } }],
      };
      const url =
        `${process.env.CLARIFAI_API_URL}/` +
        `${process.env.CLARIFAI_API_VERSION}/users/` +
        `${process.env.CLARIFAI_USER_ID}/apps/` +
        `tts/models/` +
        `openai-tts-1-hd/versions/` +
        `3bf4a913cf0b48ee88c954bd151b2920/outputs`;
      const { data: response } = await firstValueFrom(
        this.httpService.post(url, JSON.stringify(payload), config),
      );
      return { audio:response.outputs[0].data.audio.base64 };
    } catch (error) {
      throw new Error('Hubo un error al realizar la solicitud');
    }
  }
}
