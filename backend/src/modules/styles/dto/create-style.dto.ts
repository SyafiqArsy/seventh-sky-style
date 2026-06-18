import { ApiProperty } from '@nestjs/swagger';

export class CreateStyleDto {
  @ApiProperty({ example: 'Modern', description: 'Nama style' })
  name: string;

  @ApiProperty({ example: 'Gaya modern dengan garis bersih', description: 'Deskripsi style', required: false })
  description?: string;
}