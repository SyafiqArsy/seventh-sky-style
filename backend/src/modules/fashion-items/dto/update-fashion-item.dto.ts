import { PartialType } from '@nestjs/swagger';
import { CreateFashionItemDto } from './create-fashion-item.dto';

export class UpdateFashionItemDto extends PartialType(
  CreateFashionItemDto,
) {}