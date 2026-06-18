import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { BodyTypesService } from './body-types.service';
import { CreateBodyTypeDto } from './dto/create-body-type.dto';
import { UpdateBodyTypeDto } from './dto/update-body-type.dto';

@ApiTags('Body Types')
@Controller('body-types')
export class BodyTypesController {
  constructor(
    private readonly bodyTypesService: BodyTypesService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all body types' })
  @ApiResponse({ status: 200, description: 'Return all body types' })
  async findAll() {
    return this.bodyTypesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a body type by ID' })
  @ApiResponse({ status: 200, description: 'Return the body type' })
  @ApiResponse({ status: 404, description: 'Body type not found' })
  async findOne(@Param('id') id: string) {
    return this.bodyTypesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new body type' })
  @ApiResponse({ status: 201, description: 'Body type created successfully' })
  async create(@Body() createBodyTypeDto: CreateBodyTypeDto) {
    return this.bodyTypesService.create(createBodyTypeDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a body type' })
  @ApiResponse({ status: 200, description: 'Body type updated successfully' })
  @ApiResponse({ status: 404, description: 'Body type not found' })
  async update(@Param('id') id: string, @Body() updateBodyTypeDto: UpdateBodyTypeDto) {
    return this.bodyTypesService.update(id, updateBodyTypeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a body type' })
  @ApiResponse({ status: 204, description: 'Body type deleted successfully' })
  @ApiResponse({ status: 404, description: 'Body type not found' })
  async remove(@Param('id') id: string) {
    return this.bodyTypesService.remove(id);
  }
}