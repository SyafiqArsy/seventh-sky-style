import { ApiPropertyOptional } from '@nestjs/swagger';

export class FashionItemQueryDto {
  @ApiPropertyOptional()
  page?: number;

  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional()
  search?: string;

  @ApiPropertyOptional()
  categoryId?: string;

  @ApiPropertyOptional()
  styleId?: string;

  @ApiPropertyOptional()
  gender?: string;

  @ApiPropertyOptional()
  isActive?: string;
}