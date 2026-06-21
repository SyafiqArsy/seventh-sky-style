import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsString } from 'class-validator';

import { FeedbackType } from '@prisma/client';

export class CreateFeedbackDto {
  @ApiProperty()
  @IsString()
  recommendationItemId: string;

  @ApiProperty({
    enum: FeedbackType,
  })
  @IsEnum(FeedbackType)
  feedback: FeedbackType;
}