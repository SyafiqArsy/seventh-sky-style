import {
  IsOptional,
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
} from 'class-validator';

import {
  Gender,
  SkinTone,
  BudgetRange,
} from '@prisma/client';

export class UpdateProfileDto {
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsEnum(SkinTone)
  skinTone?: SkinTone;

  @IsOptional()
  @IsEnum(BudgetRange)
  budgetRange?: BudgetRange;

  @IsOptional()
  @IsString()
  favoriteColorId?: string;

  @IsOptional()
  @IsString()
  preferredStyleId?: string;
}