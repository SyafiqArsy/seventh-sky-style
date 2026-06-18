import { ApiProperty } from '@nestjs/swagger';

import {
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

import {
  BudgetRange,
  Gender,
  SkinTone,
} from '@prisma/client';

export class CreateProfileDto {
  @ApiProperty({
    enum: Gender,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    example: 22,
  })
  @IsInt()
  @Min(10)
  age: number;

  @ApiProperty({
    example: 175,
  })
  @IsNumber()
  height: number;

  @ApiProperty({
    example: 75,
  })
  @IsNumber()
  weight: number;

  @ApiProperty({
    enum: SkinTone,
  })
  @IsEnum(SkinTone)
  skinTone: SkinTone;

  @ApiProperty()
  @IsString()
  favoriteColorId: string;

  @ApiProperty()
  @IsString()
  preferredStyleId: string;

  @ApiProperty({
    enum: BudgetRange,
  })
  @IsEnum(BudgetRange)
  budgetRange: BudgetRange;
}