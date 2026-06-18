import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Casual', description: 'Nama kategori' })
  name: string;
}