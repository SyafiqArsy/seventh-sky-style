import { Controller, Get } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService,
  ) {}

  @Get('test')
  async test() {
    return this.aiService.analyzeProfile(
      175,
      70,
    );
  }
}