import { ApiProperty } from '@nestjs/swagger';

import {
  BudgetRange,
  Gender,
} from '@prisma/client';

import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateOutfitDto {
  @ApiProperty({
    example: 'Campus Outfit',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Comfortable outfit for campus',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: Gender,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    enum: BudgetRange,
  })
  @IsEnum(BudgetRange)
  budgetRange: BudgetRange;

  @ApiProperty({
    example: 'cmxxxx-style-id',
  })
  @IsString()
  styleId: string;

  @ApiProperty({
    example: 'cmxxxx-occasion-id',
  })
  @IsString()
  occasionId: string;

  @ApiProperty({
    example: 'cmxxxx-bodytype-id',
  })
  @IsString()
  bodyTypeId: string;

  @ApiProperty({
    example: 'https://example.com/outfit.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}