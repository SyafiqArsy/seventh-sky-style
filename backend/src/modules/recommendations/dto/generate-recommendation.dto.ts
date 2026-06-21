import {
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class GenerateRecommendationDto {
  @ApiPropertyOptional({
    example:
      'cmqibhz2w000yvcus12g3c6hr',
  })
  @IsOptional()
  @IsString()
  occasionId?: string;
}