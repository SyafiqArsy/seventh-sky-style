import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Syafiq Arsy',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'syafiq@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
  })
  @IsString()
  @MinLength(8)
  password: string;
}