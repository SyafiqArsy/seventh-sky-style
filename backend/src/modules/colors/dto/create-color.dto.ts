import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty({ example: 'Merah', description: 'Nama warna' })
  name: string;

  @ApiProperty({ example: '#FF0000', description: 'Kode hex warna' })
  hexCode: string;

  @ApiProperty({ example: 'Warna merah cerah', description: 'Deskripsi warna', required: false })
  description?: string;
}
