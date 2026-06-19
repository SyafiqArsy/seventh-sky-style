import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsOptional,
  IsString,
  IsNumberString,
} from 'class-validator';

export class OutfitQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  styleId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  occasionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bodyTypeId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  isActive?: string;
}