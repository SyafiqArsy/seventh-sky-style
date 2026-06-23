import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { StylesService } from './styles.service';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Styles')
@Controller('styles')
export class StylesController {
  constructor(
    private readonly stylesService: StylesService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all styles' })
  @ApiResponse({ status: 200, description: 'Return all styles' })
  async findAll() {
    return this.stylesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a style by ID' })
  @ApiResponse({ status: 200, description: 'Return the style' })
  @ApiResponse({ status: 404, description: 'Style not found' })
  async findOne(@Param('id') id: string) {
    return this.stylesService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new style' })
  @ApiResponse({ status: 201, description: 'Style created successfully' })
  async create(@Body() createStyleDto: CreateStyleDto) {
    return this.stylesService.create(createStyleDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a style' })
  @ApiResponse({ status: 200, description: 'Style updated successfully' })
  @ApiResponse({ status: 404, description: 'Style not found' })
  async update(@Param('id') id: string, @Body() updateStyleDto: UpdateStyleDto) {
    return this.stylesService.update(id, updateStyleDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a style' })
  @ApiResponse({ status: 204, description: 'Style deleted successfully' })
  @ApiResponse({ status: 404, description: 'Style not found' })
  async remove(@Param('id') id: string) {
    return this.stylesService.remove(id);
  }
}