import { Injectable } from '@nestjs/common';
import { PrompDto } from './dtos/prompt.dto';
import { HttpService } from '@nestjs/axios';

import { firstValueFrom } from 'rxjs';
@Injectable()
export class ClarifaiService {
  constructor(private readonly httpService: HttpService) {}
  async orthography(PrompDto: PrompDto) {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Key ${process.env.CLARIFAI_API_KEY}`,
        },
      };
      console.log('mensaje', PrompDto.prompt);
      const message =
        `Corrige la ortografia del siguiente texto :  "${PrompDto.prompt}"`;

      const payload = {
        inputs: [{ data: { text: { raw: message } } }],
      };
      console.log('payload', payload.inputs[0].data.text);
      const url =
        `${process.env.CLARIFAI_API_URL}/` +
        `${process.env.CLARIFAI_API_VERSION}/users/` +
        `gcp/apps/` +
        `generate/models/` +
        `gemini-pro/versions/` +
        `f0bba7ad9c3c486e8853e82bd66304bf/outputs`;
      console.log('url', url);
      const { data: response } = await firstValueFrom(
        this.httpService.post(url, payload, config),
      );
      return { orthography: response.outputs[0].data.text.raw };
    } catch (error) {
      throw new Error('Hubo un error al realizar la solicitud');
    }
  }
  async translate(PrompDto: PrompDto) {
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
        `helsinkinlp/apps/` +
        `translation/models/` +
        `text-translation-romance-lang-english/versions/` +
        `33110d5751fc4f669b65e95411bd9772/outputs`;
      const { data: response } = await firstValueFrom(
        this.httpService.post(url, JSON.stringify(payload), config),
      );
      return { translate: response.outputs[0].data.text.raw };
    } catch (error) {
      throw new Error('Hubo un error al realizar la solicitud');
    }
  }
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
      return { audio: response.outputs[0].data.audio.base64 };
    } catch (error) {
      throw new Error('Hubo un error al realizar la solicitud');
    }
  }
}
