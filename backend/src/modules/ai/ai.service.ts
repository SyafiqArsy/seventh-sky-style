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
}