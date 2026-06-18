import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';

import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsUrl,
} from 'class-validator';

export class CreateFashionItemDto {
  @ApiProperty({
    example: 'Black Oversized Hoodie',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Comfortable oversized hoodie',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: Gender,
    example: Gender.MALE,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    example: 349000,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'cmxxxx-category-id',
  })
  @IsString()
  categoryId: string;

  @ApiProperty({
    example: 'cmxxxx-style-id',
  })
  @IsString()
  styleId: string;

  @ApiProperty({
    example: 'cmxxxx-color-id',
  })
  @IsString()
  colorId: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}