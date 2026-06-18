import { ApiProperty } from '@nestjs/swagger';

export class CreateOccasionDto {
  @ApiProperty({ example: 'Casual', description: 'Nama occasion' })
  name: string;

  @ApiProperty({ example: 'Pakaian untuk acara santai sehari-hari', description: 'Deskripsi occasion', required: false })
  description?: string;
}
