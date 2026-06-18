import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';

export class CreateFashionItemDto {
  @ApiProperty({
    example: 'Black Oversized Hoodie',
  })
  name: string;

  @ApiProperty({
    example: 'Comfortable oversized hoodie',
    required: false,
  })
  description?: string;

  @ApiProperty({
    enum: Gender,
    example: Gender.MALE,
  })
  gender: Gender;

  @ApiProperty({
    example: 349000,
  })
  price: number;

  @ApiProperty({
    example: 'cmxxxx-category-id',
  })
  categoryId: string;

  @ApiProperty({
    example: 'cmxxxx-style-id',
  })
  styleId: string;

  @ApiProperty({
    example: 'cmxxxx-color-id',
  })
  colorId: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    required: false,
  })
  imageUrl?: string;
}