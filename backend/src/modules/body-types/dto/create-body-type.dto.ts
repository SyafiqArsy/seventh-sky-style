import { ApiProperty } from '@nestjs/swagger';

export class CreateBodyTypeDto {
  @ApiProperty({ example: 'Apple', description: 'Nama body type' })
  name: string;

  @ApiProperty({ example: 'Bentuk tubuh seperti apel dengan bahu lebar', description: 'Deskripsi body type', required: false })
  description?: string;
}