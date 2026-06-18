import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { StylesService } from './styles.service';

@ApiTags('Styles')
@Controller('styles')
export class StylesController {
  constructor(
    private readonly stylesService: StylesService,
  ) {}

  @Get()
  async findAll() {
    return this.stylesService.findAll();
  }
}