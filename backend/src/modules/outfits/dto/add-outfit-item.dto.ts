import { ApiProperty } from '@nestjs/swagger';

import { OutfitItemRole } from '@prisma/client';

import {
  IsEnum,
  IsString,
} from 'class-validator';

export class AddOutfitItemDto {
  @ApiProperty({
    enum: OutfitItemRole,
  })
  @IsEnum(OutfitItemRole)
  role: OutfitItemRole;

  @ApiProperty({
    example: 'cmxxxx-fashion-item-id',
  })
  @IsString()
  fashionItemId: string;
}