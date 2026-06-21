import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AiService {
  constructor(
    private readonly http: HttpService,
  ) {}

  async analyzeProfile(
    height: number,
    weight: number,
  ) {
    const { data } = await firstValueFrom(
      this.http.post(
        `${process.env.AI_SERVICE_URL}/api/v1/analyze-profile`,
        {
          height,
          weight,
        },
      ),
    );

    return data;
  }

  async generateFashionAdvice(
    payload: any,
  ) {
    const { data } = await firstValueFrom(
      this.http.post(
        `${process.env.AI_SERVICE_URL}/api/v1/fashion-advice`,
        payload,
      ),
    );

    return data;
  }

  async generatePrompt(
    payload: any,
  ) {
    const { data } = await firstValueFrom(
      this.http.post(
        `${process.env.AI_SERVICE_URL}/api/v1/generate-prompt`,
        payload,
      ),
    );

    return data;
  }

  async generateImage(
    prompt: string,
  ) {
    const { data } = await firstValueFrom(
      this.http.post(
        `${process.env.AI_SERVICE_URL}/api/v1/generate-image`,
        {
          prompt,
        },
      ),
    );

    return data;
  }
}